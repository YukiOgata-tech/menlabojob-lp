/**
 * スパム対策ユーティリティ
 */

const RATE_LIMIT_KEY = "menlabojob_submission_history";
const RATE_LIMIT_MINUTES = 7;
const MAX_SUBMISSIONS = 2;

/**
 * レート制限チェック（LocalStorage使用）
 * 指定時間内に指定件数以上送信していないかチェック
 */
export function checkRateLimit(): {
  allowed: boolean;
  remainingTime?: number;
  currentCount?: number;
} {
  if (typeof window === "undefined") {
    return { allowed: true };
  }

  try {
    const historyStr = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const limitMs = RATE_LIMIT_MINUTES * 60 * 1000;

    if (!historyStr) {
      return { allowed: true, currentCount: 0 };
    }

    // 送信履歴を取得
    const history: number[] = JSON.parse(historyStr);

    // 指定時間内の送信のみをフィルタリング
    const recentSubmissions = history.filter(
      (timestamp) => now - timestamp < limitMs
    );

    // 指定件数以上送信している場合
    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
      // 最も古い送信から制限時間が経過するまでの残り時間を計算
      const oldestSubmission = Math.min(...recentSubmissions);
      const remainingMs = limitMs - (now - oldestSubmission);
      const remainingMinutes = Math.ceil(remainingMs / 60000);

      return {
        allowed: false,
        remainingTime: remainingMinutes,
        currentCount: recentSubmissions.length,
      };
    }

    return {
      allowed: true,
      currentCount: recentSubmissions.length,
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // エラーの場合は送信を許可
    return { allowed: true };
  }
}

/**
 * 送信タイムスタンプを記録
 */
export function recordSubmission(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const historyStr = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const limitMs = RATE_LIMIT_MINUTES * 60 * 1000;

    let history: number[] = [];

    if (historyStr) {
      history = JSON.parse(historyStr);
      // 指定時間以内の送信履歴のみを保持
      history = history.filter((timestamp) => now - timestamp < limitMs);
    }

    // 新しいタイムスタンプを追加
    history.push(now);

    // LocalStorageに保存
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Record submission error:", error);
  }
}

/**
 * レート制限をクリア（テスト用）
 */
export function clearRateLimit(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(RATE_LIMIT_KEY);
  } catch (error) {
    console.error("Clear rate limit error:", error);
  }
}

/**
 * ハニーポット検証
 * ボットが隠しフィールドに入力した場合はfalseを返す
 */
export function validateHoneypot(value: string): boolean {
  // ハニーポットフィールドは空であるべき
  return !value || value.trim() === "";
}
