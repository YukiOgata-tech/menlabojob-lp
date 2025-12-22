# メンラボジョブ LP

福祉・医療・介護特化の転職サービス「メンラボジョブ」のランディングページです。

## 技術スタック

- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Form Management**: React Hook Form + Zod
- **State Management**: Zustand
- **Database**: Firebase Firestore
- **Deployment**: Vercel (推奨)

## 主な機能

- レスポンシブデザイン (モバイルファースト)
- スムーズなアニメーション
- 5ステップの登録フォーム
- Firebase Firestoreとの連携
- アコーディオン形式のFAQ
- スクロール追従型ヘッダー

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` を `.env.local` にコピーして、Firebase設定を追加します。

```bash
cp .env.local.example .env.local
```

`.env.local` ファイルに以下の環境変数を設定してください：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 3. Firebase プロジェクトの設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Firestore Database を有効化
3. プロジェクト設定から設定情報を取得し、`.env.local` に追加
4. Firestore のセキュリティルールを設定（開発時は以下を使用）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

**本番環境では適切なセキュリティルールを設定してください。**

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルドとデプロイ

### ビルド

```bash
npm run build
```

### ローカルでビルド版を実行

```bash
npm start
```

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com) でプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

## プロジェクト構成

```
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # メインページ
│   └── globals.css         # グローバルスタイル
├── components/
│   ├── common/             # 共通コンポーネント
│   │   └── Container.tsx
│   ├── forms/              # フォーム関連
│   │   ├── RegistrationForm.tsx
│   │   ├── StepIndicator.tsx
│   │   └── steps/          # 各ステップコンポーネント
│   ├── layout/             # レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/           # セクションコンポーネント
│   │   ├── HeroSection.tsx
│   │   ├── FeatureSection.tsx
│   │   ├── VisionMatchSection.tsx
│   │   └── FAQSection.tsx
│   └── ui/                 # shadcn/ui コンポーネント
├── lib/
│   ├── firebase/           # Firebase設定
│   │   ├── config.ts
│   │   └── registrations.ts
│   ├── store/              # Zustand ストア
│   │   └── registrationStore.ts
│   └── utils.ts            # ユーティリティ関数
└── docs/
    └── menlabojob_lp_content.md  # コンテンツ定義
```

## カスタマイズ

### カラーパレット

`app/globals.css` でカラーパレットを変更できます：

- **Primary**: グリーン系 (oklch(0.55 0.15 155))
- **Secondary**: コーラル系 (oklch(0.75 0.12 15))
- **Accent**: イエロー系 (oklch(0.85 0.12 95))

### 画像の追加

現在、背景画像やロゴは仮のものです。以下の場所に実際の画像を追加してください：

- ロゴ: `public/logo.png` または `public/logo.svg`
- ヒーローセクション画像: `public/hero-image.jpg` など
- その他の画像: `public/images/` フォルダに配置

画像を追加後、各コンポーネント内の該当箇所を更新してください。

## 今後の改善点

- [ ] 実際のロゴと背景画像の追加
- [ ] メタ画像（OGP画像）の作成と設定
- [ ] アクセシビリティの向上
- [ ] パフォーマンス最適化
- [ ] エラーハンドリングの強化
- [ ] ユニットテストの追加
- [ ] E2Eテストの追加

## ライセンス

©2025 mental health labo, Inc.

## サポート

問題が発生した場合は、GitHubのIssuesで報告してください。
