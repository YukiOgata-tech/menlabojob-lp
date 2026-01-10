"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { saveUTMParams, trackTrafficSource, trackPageView } from "@/lib/utils/gtm";

/**
 * GTMトラッキングコンポーネント（内部）
 * - UTMパラメータの自動キャプチャ
 * - ページビューの追跡
 * - 流入元情報の送信
 */
function GTMTrackerInner() {
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

/**
 * GTMトラッキングコンポーネント（Suspense境界付き）
 */
export default function GTMTracker() {
  return (
    <Suspense fallback={null}>
      <GTMTrackerInner />
    </Suspense>
  );
}
