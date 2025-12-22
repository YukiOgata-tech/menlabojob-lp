import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
            step === currentStep
              ? "bg-primary text-primary-foreground scale-110"
              : step < currentStep
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
          )}
        >
          {step.toString().padStart(2, "0")}
        </div>
      ))}
    </div>
  );
}
