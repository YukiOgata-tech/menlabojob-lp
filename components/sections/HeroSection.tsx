"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export function HeroSection({ onRegisterClick }: HeroSectionProps) {

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 pt-20">
      {/* Background Decoration - Desktop only */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Mobile Layout */}
      <div className="flex min-h-[calc(100vh-3rem)] flex-col sm:hidden relative">
        {/* Mobile Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[95vh] w-full"
        >
          <Image
            src="/images/hero-mobile.png"
            alt="メンラボジョブ"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Mobile Content at Bottom */}
        <Container className=" absolute bottom-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center shadow-2xl"
          >
            <Button
              onClick={onRegisterClick}
              size="lg"
              className="h-14 w-full gap-2 rounded-full bg-red-400 py-4 px-4 text-base shadow-lg hover:bg-red-500"
            >
              簡単30秒でOK! 登録はこちら
              <Image
                src="/images/menlabjob-icon-white.webp"
                alt=""
                width={24}
                height={24}
                className="h-5 w-7.5"
              />
            </Button>
          </motion.div>
        </Container>
      </div>

      {/* Desktop Layout */}
      <div className="hidden min-h-[95vh] flex-col sm:flex relative">
        {/* Desktop Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[75vh] w-auto"
        >
          <Image
            src="/images/hero-pc.png"
            alt="メンラボジョブ"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Desktop Button at Bottom */}
        <Container className="absolute bottom-84 -left-34">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <Button
              onClick={onRegisterClick}
              size="lg"
              className="h-14 w-2/5 gap-2 rounded-full bg-red-400 py-4 px-2 text-lg shadow-lg hover:bg-red-500"
            >
              簡単30秒でOK! 登録はこちら
              <Image
                src="/images/menlabjob-icon-white.webp"
                alt=""
                width={24}
                height={24}
                className="h-5 w-7.5"
              />
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
