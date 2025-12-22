import { auth, db } from "./config";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface UserProfile {
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

/**
 * ログイン処理
 */
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

/**
 * ログアウト処理
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

/**
 * 現在のユーザーを取得
 */
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * ユーザープロファイルを取得
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        email: data.email,
        role: data.role || "user",
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error("Get user profile error:", error);
    throw error;
  }
}

/**
 * ユーザーが管理者権限を持っているか確認
 */
export async function isAdmin(uid: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(uid);
    return profile?.role === "admin";
  } catch (error) {
    console.error("Check admin error:", error);
    return false;
  }
}

/**
 * 現在のユーザーが管理者権限を持っているか確認
 */
export async function checkCurrentUserIsAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return await isAdmin(user.uid);
}
