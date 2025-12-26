# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

メンラボジョブ LP - 福祉・医療・介護特化の転職サービスのランディングページ。5ステップの登録フォームを持ち、Firebase Firestoreで登録データを管理する。管理者コンソールで登録データの閲覧・ステータス管理が可能。

**Tech Stack**: Next.js 16.1 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui (Radix UI), Framer Motion, React Hook Form + Zod, Zustand, Firebase (Firestore + Auth)

## Commands

### Development
```bash
npm run dev          # 開発サーバー起動 (localhost:3000)
npm run build        # 本番ビルド
npm start            # ビルド後の本番サーバー起動
npm run lint         # ESLint実行
```

### Environment Setup
1. `.env.local.example` を `.env.local` にコピー
2. Firebase設定を追加 (NEXT_PUBLIC_FIREBASE_* 環境変数)

### Firebase CLI (if needed)
```bash
firebase deploy --only firestore:rules    # Firestore Security Rulesデプロイ
firebase deploy --only firestore:indexes  # Firestore Indexesデプロイ
```

## Architecture

### State Management Pattern
- **Zustand**: フォームデータの多段階管理 (`lib/store/registrationStore.ts`)
  - `RegistrationData`: 5ステップの登録フォームデータ
  - `currentStep`: 現在のステップ (1-5)
  - ステップ間のデータ永続化と状態遷移を管理

### Firebase Data Structure
```
form/
  └─ form01/
      └─ registrations/ (collection)
          └─ {docId}
              - priority, qualifications, prefecture, fullName, age
              - phoneNumber, email, agreeToTerms, applyForAgent
              - createdAt, status (pending/approved/rejected)

users/
  └─ {uid}
      - email, role (admin/user), createdAt
```

### Admin Console Architecture
- **Authentication Flow** (`app/mlj-admin-console/`)
  - `/login`: Firebase Authentication経由のログイン
  - `/page.tsx`: 管理者権限チェック後にコンソール表示
  - `lib/firebase/auth.ts`: role-based access control (users collectionのroleフィールド)

- **Incremental Data Loading** (`lib/firebase/registrations.ts`)
  - `getNewRegistrations()`: lastFetch以降の差分データのみ取得
  - LocalStorageでタイムスタンプ管理 (`mlj_admin_last_fetch`)
  - Firestore読み取り回数削減のための最適化

- **React Query Integration** (`lib/hooks/useRegistrations.ts`)
  - 登録データのキャッシュ管理
  - `refreshAll()`: 全データ再取得
  - `updateLocalRegistration()`: 楽観的UI更新

- **Admin Console Features** (`components/admin/RegistrationsTable.tsx`)
  - 検索・フィルタ: 氏名、メールアドレス、電話番号、都道府県でリアルタイムフィルタリング
  - ソート: 各列ヘッダーをクリックで昇順・降順切り替え
  - CSV Export: フィルタ後のデータをBOM付きUTF-8でダウンロード
  - 統計情報: 総登録数、エージェント希望者数、表示中件数

### Form Flow
1. `components/forms/RegistrationForm.tsx`: メインフォームコンポーネント
2. `components/forms/steps/Step*.tsx`: 各ステップコンポーネント (1-5)
3. `components/forms/StepIndicator.tsx`: 進捗表示
4. Validation: React Hook Form + Zod (`lib/utils/validation.ts`)
5. Spam Protection: Honeypot field (`website`) + タイムスタンプチェック (`lib/utils/spam-protection.ts`)
6. Duplicate Check: `checkDuplicateRegistration()` - email + phoneNumber + status=pendingで重複判定

### UI Component Pattern
- **shadcn/ui** (`components/ui/`): Radix UIベースのコンポーネント
- **Framer Motion**: アニメーション (`components/sections/`)
- **Tailwind CSS 4**: グローバルスタイル (`app/globals.css`)
  - カスタムカラー: primary (グリーン oklch(0.55 0.15 155)), secondary (コーラル), accent (イエロー)

### Path Alias
- `@/*`: プロジェクトルート (`tsconfig.json` paths設定)

## Documentation

プロジェクト固有のドキュメントは `docs/` フォルダに配置：

- **ADMIN_SETUP.md**: 管理者ユーザー作成とFirestoreセキュリティルールの詳細手順
- **SPAM_PROTECTION.md**: スパム対策実装の詳細（レート制限・Honeypot・重複チェック）
- **menlabojob_lp_content.md**: LPのコンテンツ定義（仮公開サイトのテキスト整理）
- **terms.md**: 利用規約
- **complete-page.md**: 登録完了ページのコンテンツ

## Development Notes

### Adding New Form Steps
1. `lib/store/registrationStore.ts`でRegistrationDataインターフェースを更新
2. `components/forms/steps/`に新しいステップコンポーネント作成
3. `components/forms/RegistrationForm.tsx`でステップを追加
4. `lib/utils/validation.ts`でバリデーションスキーマ追加

### Firebase Setup

**Required Firestore Indexes** (`firestore.indexes.json`):
- 重複チェッククエリに必要な複合インデックス:
  - `email` (ASCENDING) + `phoneNumber` (ASCENDING) + `status` (ASCENDING)
- デプロイ: `firebase deploy --only firestore:indexes`

**Firestore Security Rules** (`firestore.rules`):
```javascript
// 登録データ
match /form/form01/registrations/{document} {
  allow create: if true;              // 誰でも新規登録可能
  allow read: if isAdmin();           // 管理者のみ読み取り
  allow update, delete: if isAdmin(); // 管理者のみ更新・削除
}

// isAdmin() 関数
function isAdmin() {
  return request.auth != null &&
         exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```
- デプロイ: `firebase deploy --only firestore:rules`
- 詳細は `docs/ADMIN_SETUP.md` 参照

### Admin User Setup

詳細手順は `docs/ADMIN_SETUP.md` 参照。概要:

1. **Firebase Console > Authentication**でユーザー作成、UIDをコピー
2. **Firestore > `users/{uid}`**に以下のドキュメント作成:
   ```json
   {
     "email": "admin@example.com",
     "role": "admin",
     "createdAt": [timestamp]
   }
   ```
3. Firestore Security Rulesをデプロイ
4. `/mlj-admin-console/login`からログイン可能

### Spam Protection Strategy

実行順序（`lib/utils/spam-protection.ts`、`lib/firebase/registrations.ts`）:

1. **Honeypot Check**: CSS非表示の`website`フィールド - ボットが自動入力すると拒否
2. **Rate Limit Check**: LocalStorageで送信履歴管理
   - **7分以内に2件まで**送信可能
   - 3件目以降は最も古い送信から7分経過まで制限
   - 端末（ブラウザ）ごとに独立
3. **Duplicate Check**: Firestore query - 同一email+phoneNumber+pending状態の登録を拒否

**設定値**（`lib/utils/spam-protection.ts`）:
```typescript
RATE_LIMIT_MINUTES = 7  // 7分間
MAX_SUBMISSIONS = 2     // 最大2件
```

## Code Style

- TypeScript strict mode有効
- ESLint: Next.js推奨設定 + Prettier統合
- Prettier: Tailwind CSS plugin使用
- Import sorting: `eslint-plugin-simple-import-sort`（設定済みならソート順に従う）

## Deployment

推奨環境: Vercel
- GitHub連携で自動デプロイ
- 環境変数設定必須 (NEXT_PUBLIC_FIREBASE_*)
