"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRegistrationStore } from "@/lib/store/registrationStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { Step1Priority } from "./steps/Step1Priority";
import { Step2Qualifications } from "./steps/Step2Qualifications";
import { Step3PersonalInfo } from "./steps/Step3PersonalInfo";
import { Step4Agreement } from "./steps/Step4Agreement";
import { Step5Complete } from "./steps/Step5Complete";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { isValidEmail, isValidPhoneNumber } from "@/lib/utils/validation";
import {
  checkRateLimit,
  recordSubmission,
  validateHoneypot,
} from "@/lib/utils/spam-protection";
import { checkDuplicateRegistration } from "@/lib/firebase/registrations";
import { trackFormEvent, getSavedUTMParams } from "@/lib/utils/gtm";

interface RegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationForm({ open, onOpenChange }: RegistrationFormProps) {
  const { currentStep, data, nextStep, prevStep, reset } = useRegistrationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォーム開始イベントを追跡
  useEffect(() => {
    if (open && currentStep === 1) {
      trackFormEvent("start", 1);
    }
  }, [open, currentStep]);

  const handleClose = () => {
    // 確認ダイアログを表示（ステップ5以外の場合）
    if (currentStep < 5) {
      const confirmed = window.confirm("入力内容が失われますが、閉じてもよろしいですか？");
      if (!confirmed) {
        return;
      }
      // フォーム放棄イベントを送信
      trackFormEvent("abandon", currentStep);
    }
    reset();
    onOpenChange(false);
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return !!data.priority;
      case 2:
        return data.qualifications.length > 0;
      case 3:
        return !!(
          data.prefecture &&
          data.fullName &&
          data.age &&
          data.phoneNumber &&
          isValidPhoneNumber(data.phoneNumber) &&
          data.email &&
          isValidEmail(data.email)
        );
      case 4:
        return data.agreeToTerms;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!canProceedToNextStep()) {
      // ステップ3の場合、より具体的なエラーメッセージを表示
      if (currentStep === 3) {
        if (!data.phoneNumber || !isValidPhoneNumber(data.phoneNumber)) {
          toast.error("正しい電話番号を入力してください");
          return;
        }
        if (!data.email || !isValidEmail(data.email)) {
          toast.error("正しいメールアドレスを入力してください");
          return;
        }
      }
      toast.error("必須項目を入力してください");
      return;
    }

    if (currentStep === 4) {
      // Submit to Firestore
      setIsSubmitting(true);
      try {
        // スパム対策チェック

        // 1. ハニーポットチェック
        if (!validateHoneypot(data.website || "")) {
          toast.error("不正な送信が検知されました。");
          setIsSubmitting(false);
          return;
        }

        // 2. レート制限チェック
        const rateLimitResult = checkRateLimit();
        if (!rateLimitResult.allowed) {
          toast.error(
            `送信回数の上限に達しました（7分以内に2件まで）。あと${rateLimitResult.remainingTime}分後に再度お試しください。`
          );
          setIsSubmitting(false);
          return;
        }

        // 3. 重複登録チェック
        const isDuplicate = await checkDuplicateRegistration(
          data.email || "",
          data.phoneNumber || ""
        );
        if (isDuplicate) {
          toast.error(
            "同じメールアドレスと電話番号での登録が既に処理中です。しばらくお待ちください。"
          );
          setIsSubmitting(false);
          return;
        }

        // Firebase integration
        const { submitRegistration } = await import("@/lib/firebase/registrations");
        await submitRegistration(data);

        // 送信成功時にタイムスタンプを記録
        recordSubmission();

        // フォーム送信完了イベントを送信（UTMパラメータも含める）
        const utmParams = getSavedUTMParams();
        trackFormEvent("submit", 5, {
          apply_for_agent: data.applyForAgent,
          priority: data.priority,
          qualifications_count: data.qualifications.length,
          prefecture: data.prefecture,
          ...utmParams,
        });

        toast.success("登録が完了しました！");

        // Close modal and redirect to complete page
        onOpenChange(false);
        reset();
        window.location.href = "/complete";
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "登録に失敗しました。もう一度お試しください。"
        );
        console.error("Registration error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // 次のステップへ進む
      nextStep();
      // ステップ完了イベントを送信
      trackFormEvent("step_complete", currentStep);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Priority />;
      case 2:
        return <Step2Qualifications />;
      case 3:
        return <Step3PersonalInfo />;
      case 4:
        return <Step4Agreement />;
      case 5:
        return <Step5Complete />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0" showCloseButton={true}>
        {/* Background Container */}
        <div className="relative overflow-hidden rounded-lg pointer-events-none">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/bg-01.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* White Overlay */}
          <div className="absolute inset-0 -z-10 bg-white/80" />

          {/* Content */}
          <div className="relative z-10 p-3 sm:p-6 pointer-events-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-xl sm:text-2xl">
                {currentStep === 5 ? "" : "会員登録"}
              </DialogTitle>
            </DialogHeader>

            {currentStep < 5 && <StepIndicator currentStep={currentStep} totalSteps={5} />}

            <div className="py-2 sm:py-4">{renderStep()}</div>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex gap-2 pt-3 sm:gap-3 sm:pt-4">
                {currentStep > 1 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    disabled={isSubmitting}
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    戻る
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="flex-1 rounded-full"
                  disabled={!canProceedToNextStep() || isSubmitting}
                >
                  {isSubmitting
                    ? "送信中..."
                    : currentStep === 4
                      ? "登録する"
                      : "次へ"}
                  {!isSubmitting && currentStep < 4 && (
                    <ChevronRight className="ml-2 h-5 w-5" />
                  )}
                </Button>
              </div>
            )}

            {/* Close Button for Step 5 */}
            {currentStep === 5 && (
              <div className="pt-4">
                <Button
                  onClick={handleClose}
                  size="lg"
                  className="w-full rounded-full"
                >
                  閉じる
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
