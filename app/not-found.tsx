import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/menlabjob_lp_header.webp"
            alt="メンラボジョブ"
            width={280}
            height={64}
            className="h-12 w-auto"
          />
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-primary sm:text-9xl">404</h1>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            ページが見つかりません
          </h2>
          <p className="text-muted-foreground">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>

        {/* Back to Home Button */}
        <Link href="/">
          <Button
            size="lg"
            className="gap-2 rounded-full bg-primary px-8 shadow-lg hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            トップページに戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}
