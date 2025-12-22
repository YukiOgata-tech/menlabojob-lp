"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";

export default function CompletePage() {
  const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE || "050-1790-8445";

  const handlePhoneClick = () => {
    const confirmed = window.confirm(`${phoneNumber} に電話をかけますか？`);
    if (confirmed) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image - Rotated 90 degrees */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: 'rotate(90deg) scale(1.5)', transformOrigin: 'center' }}>
          <Image
            src="/images/bg-01.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/60 backdrop-blur-sm">
        <Container className="py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/menlabjob_lp_header.webp"
                alt="メンラボジョブ by Mental Health Labo"
                width={280}
                height={64}
                className="h-12 w-auto sm:h-14"
                priority
              />
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_COMPANY_URL || "https://logz.co.jp"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2">
                会社ホームページ
              </Button>
            </Link>
          </div>

          {/* Development Navigation */}
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container className="max-w-4xl">
          <div className="space-y-8">
            {/* 登録完了 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center justify-center space-y-4 rounded-3xl bg-white p-8 shadow-lg sm:p-12"
            >
              <div className="rounded-full bg-gradient-to-br from-yellow-400/20 to-green-400/20 p-6">
                <CheckCircle2 className="h-20 w-20 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">登録完了</h1>
              <p className="text-xl text-muted-foreground">ご登録ありがとうございます</p>
            </motion.div>

            {/* ご登録の後は無料相談 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="rounded-3xl bg-gradient-to-br from-yellow-100 to-green-100 p-8 text-center shadow-lg"
            >
              <h2 className="mb-3 text-2xl font-bold">ご登録の後は無料相談</h2>
              <p className="text-lg text-muted-foreground">
                転職のプロに
                <br />
                無料相談が可能です。
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* 無料相談ダイヤル */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-4 rounded-3xl border-2 border-yellow-400/30 bg-white p-6 shadow-lg"
              >
                <h3 className="text-center text-xl font-bold">無料相談ダイヤル</h3>
                <Button
                  onClick={handlePhoneClick}
                  size="lg"
                  className="h-16 w-full gap-2 rounded-full bg-green-500 text-lg hover:bg-green-600"
                >
                  <Phone className="h-6 w-6" />
                  {phoneNumber}
                </Button>
                <p className="text-center font-semibold text-muted-foreground">電話で相談する</p>
              </motion.div>

              {/* LINE公式アカウント */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-4 rounded-3xl border-2 border-green-400/30 bg-white p-6 shadow-lg"
              >
                <h3 className="text-center text-xl font-bold">LINE公式アカウント</h3>
                <Link
                  href={process.env.NEXT_PUBLIC_OFFICIAL_LINE_URL || "https://lin.ee/Tv0C9Q2"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="h-16 w-full gap-2 rounded-full bg-[#06C755] text-lg hover:bg-[#05b34b]"
                  >
                    <MessageCircle className="h-6 w-6" />
                    LINE公式アカウント
                  </Button>
                </Link>
                <div className="space-y-2 text-center text-sm text-muted-foreground">
                  <p className="font-semibold">LINE公式アカウントでできること</p>
                  <ul className="space-y-1">
                    <li>• 求人情報をお届け</li>
                    <li>• ご相談も可能</li>
                  </ul>
                </div>
                <p className="text-center font-semibold text-muted-foreground">LINEで相談</p>
              </motion.div>
            </div>

            {/* ご利用の流れ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-6 rounded-3xl bg-white p-8 shadow-lg sm:p-12"
            >
              <h2 className="mb-6 text-center text-3xl font-bold">ご利用の流れ</h2>
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-white">
                      1
                    </div>
                    <h3 className="text-xl font-bold">ヒアリング</h3>
                  </div>
                  <p className="ml-13 text-muted-foreground">
                    担当のアドバイザーから、お電話またはメールでご連絡いたします。
                    <br />
                    ご希望条件をお聞かせください。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-white">
                      2
                    </div>
                    <h3 className="text-xl font-bold">お仕事のご紹介</h3>
                  </div>
                  <p className="ml-13 text-muted-foreground">
                    お伺いした条件にあった求人をご紹介いたします。
                    <br />
                    実際に働く方の声などの情報や、
                    <br />
                    ご登録者限定の非公開求人もご紹介します。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-white">
                      3
                    </div>
                    <h3 className="text-xl font-bold">応募・面接</h3>
                  </div>
                  <p className="ml-13 text-muted-foreground">
                    ご希望の求人があれば、アドバイザーが
                    <br />
                    選考のお手続きを進めます。
                    <br />
                    面接や履歴書の書き方など、すべてサポートいたします。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-white">
                      4
                    </div>
                    <h3 className="text-xl font-bold">内定、条件確認</h3>
                  </div>
                  <p className="ml-13 text-muted-foreground">
                    内定後、アドバイザーが条件調整をいたします。
                    <br />
                    給与や休日など、言い出しづらい交渉も、
                    <br />
                    アドバイザーが担当いたします。
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-white">
                      5
                    </div>
                    <h3 className="text-xl font-bold">入職後</h3>
                  </div>
                  <p className="ml-13 text-muted-foreground">
                    入職後に、事前に聞いた条件と違った場合や
                    <br />
                    再転職を考えたときなども、
                    <br />
                    すべてサポートいたします。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* サービスすべて無料 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="rounded-3xl bg-green-600 p-8 text-center text-white shadow-lg sm:p-12"
            >
              <h2 className="text-3xl font-bold">サービスすべて無料</h2>
              <p className="mt-3 text-lg">
                ご登録者様よりお金をいただくことは一切ございません。
              </p>
            </motion.div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden py-10">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg-01.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <Container>
          <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-8">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/menlabjob_lp_header.webp"
                  alt="メンラボジョブ by Mental Health Labo"
                  width={300}
                  height={72}
                  className="h-14 w-auto md:h-16"
                />
              </Link>

              <div className="flex flex-col items-start gap-4">
                <nav className="flex gap-6">
                  <Link
                    href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "https://logz.co.jp/privacypolicy"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    プライバシーポリシー
                  </Link>
                  <Link
                    href="/terms"
                    className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    利用規約
                  </Link>
                </nav>

                <p className="text-sm font-semibold text-foreground">
                  ©2025 mental health labo, Inc.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
