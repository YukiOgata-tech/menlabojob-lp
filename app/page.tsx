"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { VisionMatchSection } from "@/components/sections/VisionMatchSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistrationOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onRegisterClick={handleRegisterClick} />
      <main>
        <HeroSection onRegisterClick={handleRegisterClick} />
        <FeatureSection />
        <VisionMatchSection onRegisterClick={handleRegisterClick} />
        <FAQSection />
        {/* Registration CTA Section */}
        <section id="registration" className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
                さあ、始めましょう
              </h2>
              <p className="mb-2 sm:mb-8 text-lg text-muted-foreground">
                簡単30秒で登録完了。理想の職場を見つけませんか？
              </p>
              <Button
                onClick={() => setIsRegistrationOpen(true)}
                size="lg"
                className="h-14 rounded-full px-12 text-base shadow-lg hover:shadow-xl"
              >
                無料登録はこちら
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* Mobile Fixed Registration Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <Button
          onClick={handleRegisterClick}
          size="lg"
          className="h-16 w-full rounded-none bg-red-400 text-lg font-bold shadow-lg hover:bg-red-500"
        >
          登録はこちら！
        </Button>
      </div>

      {/* Registration Form Dialog */}
      <RegistrationForm
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
      />
    </div>
  );
}
