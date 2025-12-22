"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <Container className="flex min-h-screen items-center justify-center">
            <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
              <div className="mb-4 text-6xl">⚠️</div>
              <h1 className="mb-2 text-2xl font-bold text-foreground">
                エラーが発生しました
              </h1>
              <p className="mb-6 text-muted-foreground">
                申し訳ございません。予期しないエラーが発生しました。
                <br />
                ページを再読み込みしてお試しください。
              </p>
              {this.state.error && process.env.NODE_ENV === "development" && (
                <details className="mb-6 rounded-lg bg-muted p-4 text-left">
                  <summary className="cursor-pointer font-semibold">
                    エラー詳細（開発環境のみ）
                  </summary>
                  <pre className="mt-2 overflow-auto text-xs">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  ページを再読み込み
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="flex-1"
                >
                  トップページへ
                </Button>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
