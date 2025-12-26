"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFAQInteraction } from "@/lib/utils/gtm";

const faqs = [
  {
    question: "会員登録をすると、どんなことができるようになるか知りたいです。",
    answer:
      "＜求人に応募ができる＞\nメンラボジョブに掲載されている求人へ応募ができるようになります。\n\n＜スカウトメッセージを受け取れる＞\n法人からスカウトメッセージを受け取れるようになります。\n\n＜各種イベント・勉強会に参加できる＞\n「誰かの役に立ちたい」「自分らしく働きたい」という思いが叶う働き方に出会えるイベントや、障害福祉分野の支援者向け勉強会のご案内を受け取れます。\n\n＜新着求人や非公開求人情報が届く＞\nお住まいのエリアの新着求人や非公開求人を受け取ることができます。\n\n＜業界特化のキャリアアドバイザーに相談できる＞\n医療介護、児童福祉・障害福祉分野の就職・転職事情に詳しい、当業界に特化したキャリアアドバイザーがキャリア面談をさせていただきます。",
  },
  {
    question: "料金は発生しますか？",
    answer:
      "いいえ！\nメンラボジョブは完全無料でご利用いただけます。会員登録から求人応募、企業とのやり取りまで、すべてのサービスを無料でご利用いただけます。",
  },
  {
    question: "転職活動について相談にのってほしいです。",
    answer:
      "メンラボジョブでは、医療看護や介護、放課後デイサービスや児童発達支援、また障害のある方の就労・生活支援分野への就職を専門にサポートさせていただいているキャリアアドバイザーが所属しております。\nご希望の条件等を伺い、ご希望に合った求人のご紹介をしておりますので、フォームよりまずはご登録ください。",
  },
  {
    question: "メンラボジョブにはどんな求人が載っているか知りたいです。",
    answer:
      "メンラボジョブは、医療福祉介護分野に特化した求人・転職サイトです。\n「自分の思いを叶えられる医療福祉介護の現場で就職したい」方をサポートします。",
  },
];

export function FAQSection() {
  const handleAccordionChange = (value: string) => {
    if (value) {
      const index = parseInt(value.replace("item-", ""));
      const faq = faqs[index];
      if (faq) {
        trackFAQInteraction(faq.question, "open");
      }
    }
  };

  return (
    <section id="faq" className="py-20 lg:py-32">
      <Container size="md">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            よくある質問
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            onValueChange={handleAccordionChange}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-border bg-card px-6 shadow-sm transition-all hover:shadow-md"
              >
                <AccordionTrigger className="py-6 text-left text-base font-semibold hover:no-underline sm:text-lg">
                  Q. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line pb-6 text-muted-foreground text-gray-800">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
