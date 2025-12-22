"use client";

import { useRegistrationStore } from "@/lib/store/registrationStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const qualifications = [
  "サービス管理責任者",
  "介護福祉士",
  "児童発達管理責任者",
  "保育士",
  "相談支援専門員",
  "社会福祉士",
  "看護師",
  "その他",
];

export function Step2Qualifications() {
  const { data, setData } = useRegistrationStore();

  const toggleQualification = (qualification: string) => {
    const current = data.qualifications || [];
    const updated = current.includes(qualification)
      ? current.filter((q) => q !== qualification)
      : [...current, qualification];
    setData({ qualifications: updated });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-2xl">保有資格</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          該当する資格をすべて選択してください（複数選択可）
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {qualifications.map((qualification) => {
          const isSelected = data.qualifications?.includes(qualification);

          return (
            <button
              key={qualification}
              onClick={() => toggleQualification(qualification)}
              className={cn(
                "flex items-center justify-between rounded-xl border-2 p-3 text-left transition-all hover:border-primary/50 sm:rounded-2xl sm:p-4",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              )}
            >
              <span className="text-sm font-semibold sm:text-base">{qualification}</span>
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all sm:h-6 sm:w-6",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && <Check className="h-3 w-3 text-primary-foreground sm:h-4 sm:w-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
