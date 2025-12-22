import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 ">
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
        {/* Card Container */}
        <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-8">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/menlabjob_lp_header.webp"
                alt="メンラボジョブ by Mental Health Labo"
                width={300}
                height={72}
                className="h-14 w-auto md:h-16"
              />
            </Link>

            {/* Right: Links and Copyright */}
            <div className="flex flex-col items-start gap-4">
              {/* Links */}
              <nav className="flex gap-6">
                <Link
                  href="https://logz.co.jp/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                >
                  プライバシーポリシー
                </Link>
              </nav>

              {/* Copyright */}
              <p className="text-sm font-semibold text-foreground">
                ©2025 mental health labo, Inc.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
