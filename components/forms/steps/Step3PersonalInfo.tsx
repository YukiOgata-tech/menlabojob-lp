"use client";

import { useRegistrationStore } from "@/lib/store/registrationStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

export function Step3PersonalInfo() {
  const { data, setData } = useRegistrationStore();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-2xl">個人情報入力</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          以下の情報を入力してください
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Prefecture */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="prefecture" className="text-xs sm:text-sm">都道府県 *</Label>
          <select
            id="prefecture"
            value={data.prefecture || ""}
            onChange={(e) => setData({ prefecture: e.target.value })}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-12 sm:rounded-xl sm:px-4"
          >
            <option value="">選択してください</option>
            {prefectures.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </div>

        {/* Full Name */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="fullName" className="text-xs sm:text-sm">氏名（フルネーム） *</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="山田 太郎"
            value={data.fullName || ""}
            onChange={(e) => setData({ fullName: e.target.value })}
            className="h-10 rounded-lg sm:h-12 sm:rounded-xl"
          />
        </div>

        {/* Age */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="age" className="text-xs sm:text-sm">年齢 *</Label>
          <Input
            id="age"
            type="number"
            placeholder="30"
            value={data.age || ""}
            onChange={(e) => setData({ age: e.target.value })}
            className="h-10 rounded-lg sm:h-12 sm:rounded-xl"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="phoneNumber" className="text-xs sm:text-sm">電話番号 *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="090-1234-5678"
            value={data.phoneNumber || ""}
            onChange={(e) => setData({ phoneNumber: e.target.value })}
            className="h-10 rounded-lg sm:h-12 sm:rounded-xl"
          />
        </div>

        {/* Email */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="email" className="text-xs sm:text-sm">メールアドレス *</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={data.email || ""}
            onChange={(e) => setData({ email: e.target.value })}
            className="h-10 rounded-lg sm:h-12 sm:rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
