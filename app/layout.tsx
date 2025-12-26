import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import GTMTracker from "@/components/analytics/GTMTracker";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "メンラボジョブ | 福祉・医療・介護特化の転職サービス",
  description:
    "職場の\"ありのまま\"を見て決める。密着動画でリアルな職場の雰囲気がわかる、医療福祉介護転職のメンラボジョブ。",
  keywords: "転職,求人,福祉,医療,介護,メンラボジョブ,menlab,mental health labo,メンタルヘルスラボ,古徳一暁,悩み,仕事,人間関係,就活",
  openGraph: {
    title: "メンラボジョブ | 福祉・医療・介護特化の転職サービス",
    description:
      "職場の\"ありのまま\"を見て決める。密着動画でリアルな職場の雰囲気がわかる、医療福祉介護転職のメンラボジョブ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        {/* Facebook Pixel エラー回避用（一時的な対処） */}
        <Script id="fbq-stub" strategy="beforeInteractive">
          {`
            // GTM管理画面でFacebook Pixelタグを無効化するまでの一時的な対処
            window.fbq = window.fbq || function() {
              console.warn('Facebook Pixel is not configured. This is a stub function.');
            };
          `}
        </Script>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TZFJQMNR');
          `}
        </Script>
      </head>
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZFJQMNR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GTMTracker />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "oklch(0.55 0.15 155)",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
            },
          }}
        />
      </body>
    </html>
  );
}
