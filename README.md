# my_site

[Kazushi Suga](https://github.com/55408suga) のポートフォリオサイト。
公開先: <https://55408suga.github.io/my_site/>

## 技術スタック

- **[Astro 5](https://astro.build)** — 静的サイト生成 (出力は 0 KB JS)
- **TypeScript** (strict + `noUncheckedIndexedAccess`)
- **[Tailwind CSS v4](https://tailwindcss.com)** — `@tailwindcss/vite` プラグイン経由
- **[JetBrains Mono Variable](https://www.jetbrains.com/lp/mono/)** — 自己ホスト (Google Fonts 非依存)
- **pnpm** — パッケージマネージャ
- **GitHub Actions** — CI / Pages デプロイ / 月次再ビルド
- **Dependabot** — 月次依存更新 PR

React (`@astrojs/react`) は意図的に未登録です。スクロールリビールは BaseLayout に
インラインの vanilla `<script>` で実装しており、ハイドレーション JS をユーザに
配信しません。リッチな Island が必要になったら `pnpm astro add react` で復帰可。

## クイックスタート

```sh
pnpm install
pnpm dev          # http://localhost:4321/my_site/
pnpm typecheck    # astro check
pnpm build        # → dist/
pnpm preview      # 本番ビルドをローカルで配信
```

GitHub API を build 時に叩いて Projects セクションに pinned + allowlist の
リポジトリを表示します。`GITHUB_TOKEN` が無くても build は通り、
allowlist のみが REST API で取得されます (GraphQL pinned は token 必須)。

```sh
export GITHUB_TOKEN=ghp_xxx  # 必要な場合のみ
pnpm build
```

## ディレクトリ構成

```text
src/
  components/astro/   # Header, Footer, Section, RepoCard, SkillBadge, …
  data/
    profile.ts        # 名前 / GitHub / allowlist / 社交リンク
    content/ja.ts     # 日本語コンテンツ
    content/en.ts     # 英語コンテンツ
    repos.json        # GH fetch のキャッシュ (gitignored)
  layouts/BaseLayout.astro
  lib/
    types.ts          # Locale, RepoCard, LocaleContent, SKILLS
    github.ts         # build 時の GitHub fetch (GraphQL pinned + REST allowlist)
  pages/
    index.astro       # JP (default)
    en/index.astro    # EN
    404.astro
  styles/global.css   # Tailwind + @theme + .reveal アニメーション
public/favicon.svg
.github/
  workflows/ci.yml         # PR: typecheck + build
  workflows/deploy.yml     # push/main + workflow_dispatch + 月次 cron → Pages
  dependabot.yml           # 月次 npm + github-actions 更新
astro.config.mjs           # site/base, i18n, Tailwind Vite plugin
tsconfig.json              # strict
```

## デプロイ

`main` への push、手動 (`workflow_dispatch`)、毎月 1 日 09:00 JST の cron で
`.github/workflows/deploy.yml` が起動し、GitHub Pages にデプロイされます。
ベースパスは `/my_site/`。

リポジトリ設定 → Pages → Source を **GitHub Actions** に設定してください
(1 度だけ)。

## 国際化

- `/`     → 日本語 (default)
- `/en/`  → English

切り替えはヘッダ右上の `EN` / `JP` リンク。コンテンツは
`src/data/content/{ja,en}.ts` に分離。型は `LocaleContent` (`src/lib/types.ts`)
で保証。

## コンテンツの編集

- **自己紹介** — `src/data/content/{ja,en}.ts` の `about.bio`
- **学歴** — `education.items`
- **職歴** — `experience.items` (空なら placeholder が出る)
- **Skills** — `src/lib/types.ts` の `SKILLS` 配列
- **表示するリポジトリ** — `src/data/profile.ts` の `repoAllowlist`
  (pinned は GitHub UI で固定するだけで自動反映)
- **連絡先** — `src/data/profile.ts` の `socials`

## OG 画像

現状は未生成 (`og:image` メタ未設定)。テキストベース build 時生成 (satori)
は将来追加候補。当面は `og:title` / `og:description` のみで運用。

## Lighthouse 100 のためのガードレール

- 用途不明な JS は出力しない (React 統合は外してある)
- スクロール演出は `[data-reveal]` を BaseLayout のインライン script で監視
- フォントは woff2 サブセット (Latin のみ自動 preload 対象)
- 画像なし (favicon は SVG)
- アナリティクスなし
