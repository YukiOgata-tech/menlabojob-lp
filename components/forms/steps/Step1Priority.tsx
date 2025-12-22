"use client";

import { useRegistrationStore } from "@/lib/store/registrationStore";
import { cn } from "@/lib/utils";
import { Target, Heart, DollarSign, MapPin, Users, Gift } from "lucide-react";

const priorities = [
  { value: "vision", label: "ビジョン", icon: Target },
  { value: "fulfillment", label: "やりがい", icon: Heart },
  { value: "salary", label: "給与", icon: DollarSign },
  { value: "location", label: "勤務地", icon: MapPin },
  { value: "atmosphere", label: "雰囲気", icon: Users },
  { value: "benefits", label: "福利厚生", icon: Gift },
];

export function Step1Priority() {
  const { data, setData } = useRegistrationStore();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-2xl">転職時に重視するもの</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          最も重視する項目を1つ選択してください
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const isSelected = data.priority === priority.value;

          return (
            <button
              key={priority.value}
              onClick={() => setData({ priority: priority.value })}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all hover:border-primary/50 sm:gap-4 sm:rounded-2xl sm:p-4",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 sm:rounded-xl",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="text-sm font-semibold sm:text-base">{priority.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
