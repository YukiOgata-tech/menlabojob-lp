"use client";

import { useRegistrationStore } from "@/lib/store/registrationStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function Step4Agreement() {
  const { data, setData } = useRegistrationStore();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-2xl">同意事項</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          以下の内容をご確認ください
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:space-y-6 sm:rounded-2xl sm:p-6">
        {/* Terms of Service */}
        <div className="flex items-start gap-2 sm:gap-3">
          <Checkbox
            id="agreeToTerms"
            checked={data.agreeToTerms === true}
            onCheckedChange={(checked) => setData({ agreeToTerms: checked === true })}
          />
          <div className="flex-1">
            <Label
              htmlFor="agreeToTerms"
              className="cursor-pointer text-sm font-semibold sm:text-base"
            >
              利用規約に同意する（必須）
            </Label>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              メンラボジョブの
              <a
                href="/terms"
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                利用規約
              </a>
              および
              <a
                href="https://logz.co.jp/privacypolicy"
                className="text-primary underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                プライバシーポリシー
              </a>
              に同意します。
            </p>
          </div>
        </div>

        {/* Agent Service */}
        <div className="flex items-start gap-2 sm:gap-3">
          <Checkbox
            id="applyForAgent"
            checked={data.applyForAgent === true}
            onCheckedChange={(checked) => setData({ applyForAgent: checked === true })}
          />
          <div className="flex-1">
            <Label
              htmlFor="applyForAgent"
              className="cursor-pointer text-sm font-semibold sm:text-base"
            >
              エージェントサービス申込（任意）
            </Label>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              専任のキャリアアドバイザーによる転職サポートを希望します。
              履歴書の添削や面接対策など、無料でサポートいたします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
