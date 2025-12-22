"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

interface VisionMatchSectionProps {
  onRegisterClick: () => void;
}

export function VisionMatchSection({ onRegisterClick }: VisionMatchSectionProps) {

  return (
    <section className="py-20 lg:py-30">
      <Container>
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/bg-02.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl px-8 py-12 text-center sm:px-12 lg:py-16"
          >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-2 sm:mb-8 flex justify-center"
          >
            <div className="rounded-full p-3">
              <Image
                src="/images/menlabjob-icon-white.webp"
                alt=""
                width={40}
                height={40}
                className="h-12 w-16"
              />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 sm:mb-8 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
          >
            理念マッチ就職
          </motion.h2>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 sm:space-y-1 text-md sm:text-lg text-gray-800 leading-relaxed"
          >
            <p>「サイトに書かれていた雰囲気と違う…」</p>
            <p>就職・転職活動中に、そのように感じたことはありませんか？</p>
            <p>
              メンラボジョブは、密着動画でリアルな職場の雰囲気がわかり、
              <br className="hidden sm:inline" />
              実際の業務内容を「見る」ことが可能です！
            </p>
            <p className="font-semibold text-foreground">
              ミスマッチのない就職、始めませんか？
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button
              onClick={onRegisterClick}
              size="lg"
              className="h-14 gap-2 rounded-full bg-red-400 px-8 text-base shadow-lg transition-all hover:bg-white hover:text-red-400 hover:shadow-xl"
            >
              簡単30秒！ 登録はこちらから
              <Image
                src="/images/menlabjob-icon-white.webp"
                alt=""
                width={24}
                height={24}
                className="h-5 w-7.5 transition-all group-hover:invert"
              />
            </Button>
          </motion.div>
        </motion.div>
        </div>
      </Container>
    </section>
  );
}
