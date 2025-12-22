"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Video, Heart, Target } from "lucide-react";

const features = [
  {
    number: "01",
    numberImage: "/images/number-01.webp",
    icon: Video,
    title: "密着動画で雰囲気◎",
    description:
      "職員の密着動画で、リアルな働く人の雰囲気、現場の業務内容が「見える」！",
    color: "bg-primary/10 text-primary",
    image: "/images/feature-01.png",
  },
  {
    number: "02",
    numberImage: "/images/number-02.webp",
    icon: Heart,
    title: "登録後スカウトが届く！",
    description:
      "カンタン登録後、企業からスカウトが届き、あなたの市場価値を「知れる」！",
    color: "bg-secondary/10 text-secondary",
    image: "/images/feature-02.png",
  },
  {
    number: "03",
    numberImage: "/images/number-03.webp",
    icon: Target,
    title: "会社のビジョンでマッチ",
    description:
      "会社のビジョンや理念を必須掲載！想いや価値観が合う場所で自分らしく「働く」！",
    color: "bg-accent/10 text-accent-foreground",
    image: "/images/feature-03.png",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-10 lg:py-22">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Feature
          </p>
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <Image
              src="/images/menlabjob-header_text-only.webp"
              alt="メンラボジョブ"
              width={480}
              height={96}
              className="h-16 w-auto sm:h-20"
            />
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              の特徴
            </h2>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group relative"
              >
                <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Number Badge */}
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={feature.numberImage}
                      alt={`Feature ${feature.number}`}
                      width={80}
                      height={80}
                      className="h-16 w-auto sm:h-20"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>

                  {/* Feature Image */}
                  <div className="mb-4 overflow-hidden rounded-2xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={400}
                      height={250}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <p className="whitespace-pre-line text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
