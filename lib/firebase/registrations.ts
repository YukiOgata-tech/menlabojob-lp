import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp,
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
