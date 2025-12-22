/**
 * メールアドレスの形式を検証
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;

  // 基本的なメールアドレスの正規表現
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 日本の電話番号形式を検証
 * 対応形式:
 * - 090-1234-5678
 * - 09012345678
 * - 03-1234-5678
 * - 0312345678
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;

  // ハイフンを除去
  const phoneDigits = phone.replace(/-/g, "");

  // 数字のみかチェック
  if (!/^\d+$/.test(phoneDigits)) {
    return false;
  }

  // 日本の電話番号の桁数チェック（10桁または11桁）
  if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
    return false;
  }

  // 携帯電話（090, 080, 070）または固定電話（0X-XXXX-XXXX）の形式チェック
  if (phoneDigits.length === 11) {
    // 携帯電話
    return /^(070|080|090)\d{8}$/.test(phoneDigits);
  } else if (phoneDigits.length === 10) {
    // 固定電話
    return /^0\d{9}$/.test(phoneDigits);
  }

  return false;
}

/**
 * メールアドレスのエラーメッセージを取得
 */
export function getEmailErrorMessage(email: string): string | null {
  if (!email) return "メールアドレスを入力してください";
  if (!isValidEmail(email)) return "正しいメールアドレスを入力してください";
  return null;
}

/**
 * 電話番号のエラーメッセージを取得
 */
export function getPhoneErrorMessage(phone: string): string | null {
  if (!phone) return "電話番号を入力してください";

  const phoneDigits = phone.replace(/-/g, "");

  if (!/^\d+$/.test(phoneDigits)) {
    return "電話番号は数字とハイフンのみ使用できます";
  }

  if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
    return "電話番号は10桁または11桁で入力してください";
  }

  if (!isValidPhoneNumber(phone)) {
    return "正しい電話番号を入力してください（例: 090-1234-5678）";
  }

  return null;
}

/**
 * 年齢の形式を検証
 * 18歳以上、150歳以下を有効とする
 */
export function isValidAge(age: string | number): boolean {
  const ageNum = typeof age === "string" ? parseInt(age, 10) : age;

  if (isNaN(ageNum)) return false;

  return ageNum >= 18 && ageNum <= 150;
}

/**
 * 年齢のエラーメッセージを取得
 */
export function getAgeErrorMessage(age: string | number): string | null {
  if (!age && age !== 0) return "年齢を入力してください";

  const ageNum = typeof age === "string" ? parseInt(age, 10) : age;

  if (isNaN(ageNum)) return "正しい年齢を入力してください";

  if (ageNum < 18) return "18歳以上の方のみ登録できます";

  if (ageNum > 150) return "正しい年齢を入力してください";

  return null;
}
