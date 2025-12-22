"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onRegisterClick: () => void;
}

export function Header({ onRegisterClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-0.5 pt-6 sm:px-2 sm:pt-8">
      <div
        className={cn(
          "mx-auto max-w-13/14 md:max-w-7xl rounded-3xl transition-all duration-300",
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md"
            : "bg-white/80 shadow-md backdrop-blur-sm"
        )}
      >
        <div className="flex h-14 items-center justify-between px-6 lg:h-20 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/menlabjob_lp_header.webp"
              alt="メンラボジョブ by Mental Health Labo"
              width={280}
              height={64}
              className="h-10 w-auto sm:h-14 lg:h-16"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("features")}
              className="text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              特徴
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              よくある質問
            </button>
            <Button
              onClick={onRegisterClick}
              size="lg"
              className="h-12 gap-2 rounded-full bg-red-400 px-6 hover:bg-red-500"
            >
              登録はこちら
              <Image
                src="/images/menlabjob-icon-white.webp"
                alt=""
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-2 transition-colors hover:bg-muted md:hidden"
            aria-label="メニュー"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-border px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                特徴
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                よくある質問
              </button>
              <Button
                onClick={onRegisterClick}
                size="lg"
                className="h-12 w-full gap-2 rounded-full bg-red-400 hover:bg-red-500 font-semibold"
              >
                登録はこちら
                <Image
                  src="/images/menlabjob-icon-white.webp"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-8"
                />
              </Button>
            </div>
          </nav>
        )}
      </div>

      {/* Development Navigation */}
      {/* <div className="border-t border-dashed border-primary/30 bg-primary/5 px-6 py-2">
        <div className="flex flex-wrap items-center gap-4 text-xs">
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
      </div> */}
    </header>
  );
}
