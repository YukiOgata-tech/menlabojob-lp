import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
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
