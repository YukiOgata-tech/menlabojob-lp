"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { saveUTMParams, trackTrafficSource, trackPageView } from "@/lib/utils/gtm";

/**
 * GTMトラッキングコンポーネント
 * - UTMパラメータの自動キャプチャ
 * - ページビューの追跡
 * - 流入元情報の送信
 */
export default function GTMTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 初回アクセス時にUTMパラメータをキャプチャ
  useEffect(() => {
    saveUTMParams();
    trackTrafficSource();
  }, []);

  // ページ遷移時にページビューを送信
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname, searchParams]);

  return null; // UIは表示しない
}
