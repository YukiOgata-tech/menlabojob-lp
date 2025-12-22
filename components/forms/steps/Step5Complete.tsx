"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Step5Complete() {
  const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE || "050-1790-8445";

  const handlePhoneClick = () => {
    const confirmed = window.confirm(`${phoneNumber} に電話をかけますか？`);
    if (confirmed) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Development Navigation */}
      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-primary">開発メニュー:</span>
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-primary hover:underline"
          >
            トップページ
          </Link>
          <Link
            href="/terms"
            className="text-foreground transition-colors hover:text-primary hover:underline"
          >
            利用規約
          </Link>
          <Link
            href="/complete"
            className="text-foreground transition-colors hover:text-primary hover:underline"
          >
            登録完了ページ
          </Link>
        </div>
      </div>

      {/* Header with company link */}
      <div className="flex justify-end">
        <Link href="https://logz.co.jp" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-2">
            会社ホームページ
          </Button>
        </Link>
      </div>

      {/* 登録完了 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="rounded-full bg-gradient-to-br from-yellow-400/20 to-green-400/20 p-6">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">登録完了</h2>
        <p className="text-lg text-muted-foreground">ご登録ありがとうございます</p>
      </motion.div>

      {/* ご登録の後は無料相談 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="rounded-2xl bg-gradient-to-br from-yellow-50 to-green-50 p-6 text-center"
      >
        <h3 className="mb-2 text-xl font-bold">ご登録の後は無料相談</h3>
        <p className="text-muted-foreground">
          転職のプロに
          <br />
          無料相談が可能です。
        </p>
      </motion.div>

      {/* 無料相談ダイヤル */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="space-y-4 rounded-2xl border-2 border-yellow-400/30 bg-white p-6"
      >
        <h4 className="text-center text-lg font-bold">無料相談ダイヤル</h4>
        <Button
          onClick={handlePhoneClick}
          size="lg"
          className="h-14 w-full gap-2 rounded-full bg-green-500 text-lg hover:bg-green-600"
        >
          <Phone className="h-5 w-5" />
          {phoneNumber}
        </Button>
        <p className="text-center text-sm text-muted-foreground">電話で相談する</p>
      </motion.div>

      {/* LINE公式アカウント */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-4 rounded-2xl border-2 border-green-400/30 bg-white p-6"
      >
        <h4 className="text-center text-lg font-bold">LINE公式アカウント</h4>
        <Link
          href={process.env.NEXT_PUBLIC_OFFICIAL_LINE_URL || "https://lin.ee/Tv0C9Q2"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="h-14 w-full gap-2 rounded-full bg-[#06C755] text-lg hover:bg-[#05b34b]"
          >
            <MessageCircle className="h-5 w-5" />
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
      </motion.div>

      {/* ご利用の流れ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="space-y-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-green-50 p-6"
      >
        <h3 className="mb-4 text-center text-xl font-bold">ご利用の流れ</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                1
              </div>
              <h4 className="font-bold">ヒアリング</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              担当のアドバイザーから、お電話またはメールでご連絡いたします。
              <br />
              ご希望条件をお聞かせください。
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                2
              </div>
              <h4 className="font-bold">お仕事のご紹介</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              お伺いした条件にあった求人をご紹介いたします。
              <br />
              実際に働く方の声などの情報や、
              <br />
              ご登録者限定の非公開求人もご紹介します。
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                3
              </div>
              <h4 className="font-bold">応募・面接</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              ご希望の求人があれば、アドバイザーが
              <br />
              選考のお手続きを進めます。
              <br />
              面接や履歴書の書き方など、すべてサポートいたします。
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                4
              </div>
              <h4 className="font-bold">内定、条件確認</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              内定後、アドバイザーが条件調整をいたします。
              <br />
              給与や休日など、言い出しづらい交渉も、
              <br />
              アドバイザーが担当いたします。
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-white">
                5
              </div>
              <h4 className="font-bold">入職後</h4>
            </div>
            <p className="text-sm text-muted-foreground">
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
        className="rounded-2xl bg-green-600 p-6 text-center text-white"
      >
        <h3 className="text-xl font-bold">サービスすべて無料</h3>
        <p className="mt-2 text-sm">
          ご登録者様よりお金をいただくことは一切ございません。
        </p>
      </motion.div>
    </div>
  );
}
