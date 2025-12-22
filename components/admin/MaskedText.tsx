"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface MaskedTextProps {
  value: string;
  type?: "email" | "phone";
  className?: string;
  forceVisible?: boolean;
}

export function MaskedText({ value, type = "email", className = "", forceVisible = false }: MaskedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  const maskEmail = (email: string): string => {
    const [local, domain] = email.split("@");
    if (!domain) return email;

    const visibleChars = Math.min(2, Math.floor(local.length / 2));
    const masked = local.substring(0, visibleChars) + "****";
    return `${masked}@${domain}`;
  };

  const maskPhone = (phone: string): string => {
    // ハイフンを除去
    const digits = phone.replace(/-/g, "");

    if (digits.length === 11) {
      // 携帯電話: 090-****-5678
      return `${digits.substring(0, 3)}-****-${digits.substring(7)}`;
    } else if (digits.length === 10) {
      // 固定電話: 03-****-5678
      return `${digits.substring(0, 2)}-****-${digits.substring(6)}`;
    }

    // その他: 最初の3文字と最後の4文字のみ表示
    if (digits.length > 7) {
      return `${digits.substring(0, 3)}-****-${digits.substring(digits.length - 4)}`;
    }

    return phone;
  };

  const getMaskedValue = (): string => {
    if (type === "email") {
      return maskEmail(value);
    } else if (type === "phone") {
      return maskPhone(value);
    }
    return value;
  };

  const shouldShowValue = forceVisible || isVisible;
  const displayValue = shouldShowValue ? value : getMaskedValue();

  return (
    <button
      onClick={() => setIsVisible(!isVisible)}
      className={`group inline-flex items-center gap-2 transition-colors hover:text-primary ${className}`}
      title={shouldShowValue ? "クリックして非表示" : "クリックして表示"}
      type="button"
    >
      <span className="font-mono">{displayValue}</span>
      {shouldShowValue ? (
        <EyeOff className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      ) : (
        <Eye className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
}
