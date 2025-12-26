/**
 * Google Tag Manager ユーティリティ関数
 */

// GTM dataLayer型定義
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * dataLayerにイベントをpush
 */
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

/**
 * カスタムイベントを送信
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  pushToDataLayer({
    event: eventName,
    ...eventParams,
  });
};

/**
 * ページビューイベント
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * フォームイベントを送信
 */
export const trackFormEvent = (
  action: "start" | "step_complete" | "submit" | "abandon",
  step?: number,
  additionalData?: Record<string, any>
) => {
  const eventMap = {
    start: "form_start",
    step_complete: "form_step_complete",
    submit: "form_submit",
    abandon: "form_abandon",
  };

  trackEvent(eventMap[action], {
    form_name: "registration_form",
    form_step: step,
    ...additionalData,
  });
};

/**
 * ボタンクリックイベント
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation?: string
) => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: buttonLocation,
  });
};

/**
 * FAQ開閉イベント
 */
export const trackFAQInteraction = (question: string, action: "open" | "close") => {
  trackEvent("faq_interaction", {
    faq_question: question,
    faq_action: action,
  });
};

/**
 * スクロール深度イベント
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", {
    scroll_depth_percentage: depth,
  });
};

/**
 * UTMパラメータを取得
 */
export const getUTMParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
};

/**
 * UTMパラメータをsessionStorageに保存
 */
export const saveUTMParams = () => {
  if (typeof window === "undefined") return;

  const utmParams = getUTMParams();

  // UTMパラメータがある場合のみ保存
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(utmParams));

    // dataLayerにもpush
    pushToDataLayer({
      event: "utm_captured",
      ...utmParams,
    });
  }
};

/**
 * 保存されたUTMパラメータを取得
 */
export const getSavedUTMParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const saved = sessionStorage.getItem("utm_params");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing saved UTM params:", error);
      return {};
    }
  }

  return {};
};

/**
 * リファラー情報を取得
 */
export const getReferrer = (): string => {
  if (typeof window === "undefined") return "";
  return document.referrer || "direct";
};

/**
 * 流入元情報をdataLayerに送信
 */
export const trackTrafficSource = () => {
  if (typeof window === "undefined") return;

  const utmParams = getUTMParams();
  const savedUtmParams = getSavedUTMParams();
  const referrer = getReferrer();

  pushToDataLayer({
    event: "traffic_source",
    referrer: referrer,
    landing_page: window.location.href,
    ...utmParams,
    ...savedUtmParams,
  });
};
