"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut, checkCurrentUserIsAdmin } from "@/lib/firebase/auth";
import { getAllRegistrations, RegistrationRecord } from "@/lib/firebase/registrations";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminConsolePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();

      if (!user) {
        router.push("/mlj-admin-console/login");
        return;
      }

      const isAdminUser = await checkCurrentUserIsAdmin();

      if (!isAdminUser) {
        toast.error("管理者権限がありません");
        router.push("/");
        return;
      }

      setUserEmail(user.email || "");
      setIsAuthorized(true);
      await loadRegistrations();
    } catch (error) {
      console.error("Auth check error:", error);
      toast.error("認証エラーが発生しました");
      router.push("/mlj-admin-console/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRegistrations = async () => {
    try {
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error("Load registrations error:", error);
      toast.error("登録データの取得に失敗しました");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("ログアウトしました");
      router.push("/mlj-admin-console/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("ログアウトに失敗しました");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src="/images/menlabjob_lp_header.webp"
                  alt="メンラボジョブ"
                  width={280}
                  height={64}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">管理者コンソール</h1>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  トップページ
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                ログアウト
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <Container>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">登録データ一覧</h2>
            <p className="text-sm text-muted-foreground">
              ユーザーの登録情報を確認・管理できます
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <RegistrationsTable registrations={registrations} />
          </div>
        </Container>
      </main>
    </div>
  );
}
