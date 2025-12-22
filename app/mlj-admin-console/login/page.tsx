"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/common/Container";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      toast.success("ログインしました");
      router.push("/mlj-admin-console");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <Container className="flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <Image
              src="/images/menlabjob_lp_header.webp"
              alt="メンラボジョブ"
              width={280}
              height={64}
              className="mx-auto h-12 w-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-foreground">
              管理者ログイン
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              管理者用のメールアドレスとパスワードを入力してください
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
