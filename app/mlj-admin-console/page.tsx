"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut, checkCurrentUserIsAdmin } from "@/lib/firebase/auth";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Loader2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { useRegistrations } from "@/lib/hooks/useRegistrations";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

function AdminConsoleContent() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const router = useRouter();

  const {
    registrations,
    isLoading: isDataLoading,
    error,
    refreshAll,
    updateLocalRegistration,
    lastFetchTime,
  } = useRegistrations();

  const [isRefreshing, setIsRefreshing] = useState(false);

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
    } catch (error) {
      console.error("Auth check error:", error);
      toast.error("認証エラーが発生しました");
      router.push("/mlj-admin-console/login");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshAll();
      toast.success("データを更新しました");
    } catch (error) {
      console.error("Refresh error:", error);
      toast.error("データの更新に失敗しました");
    } finally {
      setIsRefreshing(false);
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

  if (isAuthLoading) {
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
        <Container className="py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/" className="shrink-0">
                <Image
                  src="/images/menlabjob_lp_header.webp"
                  alt="メンラボジョブ"
                  width={280}
                  height={64}
                  className="h-8 w-auto sm:h-10"
                />
              </Link>
              <div>
                <h1 className="text-sm font-bold text-foreground sm:text-lg">管理者コンソール</h1>
                <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-none">{userEmail}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden xs:inline">更新</span>
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">トップページ</span>
                  <span className="sm:hidden">トップ</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">ログアウト</span>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-4 sm:py-8">
        <Container>
          <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">登録データ一覧</h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                ユーザーの登録情報を確認・管理できます
              </p>
            </div>
            {lastFetchTime && (
              <p className="text-xs text-muted-foreground">
                最終更新:{" "}
                {formatDistanceToNow(lastFetchTime, {
                  addSuffix: true,
                  locale: ja,
                })}
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-6">
            {isDataLoading && !registrations.length ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <RegistrationsTable
                registrations={registrations}
                onUpdateRegistration={updateLocalRegistration}
              />
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}

export default function AdminConsolePage() {
  return (
    <ReactQueryProvider>
      <AdminConsoleContent />
    </ReactQueryProvider>
  );
}
