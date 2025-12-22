import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import { RegistrationData } from "../store/registrationStore";

export interface RegistrationRecord extends RegistrationData {
  id: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}

export async function submitRegistration(data: RegistrationData) {
  try {
    // Reference to form/form01 collection
    const formRef = doc(db, "form", "form01");
    const registrationRef = collection(formRef, "registrations");

    const docRef = await addDoc(registrationRef, {
      ...data,
      createdAt: serverTimestamp(),
      status: "pending", // pending, approved, rejected
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting registration:", error);
    throw new Error("登録に失敗しました。もう一度お試しください。");
  }
}

/**
 * すべての登録データを取得（管理者用）
 */
export async function getAllRegistrations(): Promise<RegistrationRecord[]> {
  try {
    const formRef = doc(db, "form", "form01");
    const registrationRef = collection(formRef, "registrations");
    const q = query(registrationRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const registrations: RegistrationRecord[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      registrations.push({
        id: doc.id,
        priority: data.priority,
        qualifications: data.qualifications || [],
        prefecture: data.prefecture,
        fullName: data.fullName,
        age: data.age,
        phoneNumber: data.phoneNumber,
        email: data.email,
        agreeToTerms: data.agreeToTerms,
        applyForAgent: data.applyForAgent,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
        status: data.status || "pending",
      });
    });

    return registrations;
  } catch (error) {
    console.error("Error getting registrations:", error);
    throw new Error("登録データの取得に失敗しました。");
  }
}

/**
 * 重複登録チェック
 * メールアドレスと電話番号の両方が一致するpending状態の登録があるかチェック
 */
export async function checkDuplicateRegistration(
  email: string,
  phoneNumber: string
): Promise<boolean> {
  try {
    const formRef = doc(db, "form", "form01");
    const registrationRef = collection(formRef, "registrations");

    // メールアドレスと電話番号の両方が一致し、statusがpendingの登録を検索
    const q = query(
      registrationRef,
      where("email", "==", email),
      where("phoneNumber", "==", phoneNumber),
      where("status", "==", "pending")
    );

    const querySnapshot = await getDocs(q);

    // 1件でもマッチすれば重複とみなす
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking duplicate registration:", error);
    // エラーの場合は安全側に倒して重複なしとする
    return false;
  }
}

/**
 * 登録のステータスを更新（管理者用）
 */
export async function updateRegistrationStatus(
  registrationId: string,
  status: "pending" | "approved" | "rejected"
): Promise<void> {
  try {
    const formRef = doc(db, "form", "form01");
    const registrationDocRef = doc(formRef, "registrations", registrationId);

    await updateDoc(registrationDocRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating registration status:", error);
    throw new Error("ステータスの更新に失敗しました。");
  }
}

const LAST_FETCH_KEY = "mlj_admin_last_fetch";

/**
 * 最後のデータ取得タイムスタンプを保存
 */
function saveLastFetchTimestamp(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
  } catch (error) {
    console.error("Error saving last fetch timestamp:", error);
  }
}

/**
 * 最後のデータ取得タイムスタンプを取得
 */
function getLastFetchTimestamp(): Date | null {
  if (typeof window === "undefined") return null;
  try {
    const timestamp = localStorage.getItem(LAST_FETCH_KEY);
    return timestamp ? new Date(parseInt(timestamp, 10)) : null;
  } catch (error) {
    console.error("Error getting last fetch timestamp:", error);
    return null;
  }
}

/**
 * 新規登録データのみを取得（増分読み取り）
 */
export async function getNewRegistrations(
  lastFetch: Date | null
): Promise<RegistrationRecord[]> {
  try {
    const formRef = doc(db, "form", "form01");
    const registrationRef = collection(formRef, "registrations");

    let q;
    if (lastFetch) {
      // 最後の取得以降のデータのみ取得
      q = query(
        registrationRef,
        where("createdAt", ">", Timestamp.fromDate(lastFetch)),
        orderBy("createdAt", "desc")
      );
    } else {
      // 初回は全データ取得
      q = query(registrationRef, orderBy("createdAt", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const registrations: RegistrationRecord[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      registrations.push({
        id: doc.id,
        priority: data.priority,
        qualifications: data.qualifications || [],
        prefecture: data.prefecture,
        fullName: data.fullName,
        age: data.age,
        phoneNumber: data.phoneNumber,
        email: data.email,
        agreeToTerms: data.agreeToTerms,
        applyForAgent: data.applyForAgent,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(),
        status: data.status || "pending",
      });
    });

    // 取得成功時にタイムスタンプを保存
    if (registrations.length > 0 || !lastFetch) {
      saveLastFetchTimestamp();
    }

    return registrations;
  } catch (error) {
    console.error("Error getting new registrations:", error);
    throw new Error("登録データの取得に失敗しました。");
  }
}

/**
 * キャッシュをクリア（管理者用）
 */
export function clearRegistrationsCache(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LAST_FETCH_KEY);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}

/**
 * 最後の取得タイムスタンプを取得（公開用）
 */
export function getLastFetch(): Date | null {
  return getLastFetchTimestamp();
}
