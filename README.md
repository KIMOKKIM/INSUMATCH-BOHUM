# INSUMATCH-BOHUM

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 데이터베이스(DB) 구조 및 안전한 백업/복구 방법

이 프로젝트는 별도의 RDBMS를 사용하지 않고 로컬 JSON 파일을 간단한 DB로 사용합니다.

- DB 파일 위치: `data/jobs.json`
- 파일 형식: JSON 배열 (각 항목은 공고 객체)
- 기본 필드:
  - `id` (string): 고유 식별자
  - `title` (string)
  - `company` (string)
  - `type` (string) - 예: "GENERAL", "FC", "TMR"
  - `level` (string) - 예: "GENERAL", "PREMIUM", "SPECIAL"
  - `location` (string)
  - `salary` (string)
  - `description` (string)
  - `contact` (string)
  - `postedAt` (string: YYYY-MM-DD)
  - `status` (string)

안전한 백업(권장)

1. 수동(간단, Windows PowerShell):
   - 현재 DB 파일을 복사하여 백업 디렉터리에 저장합니다.
     ```powershell
     mkdir -Force backups
     Copy-Item -Path "data\\jobs.json" -Destination "backups\\jobs-backup-$(Get-Date -Format yyyyMMdd_HHmmss).json"
     ```
2. 수동(간단, macOS/Linux):
   ```bash
   mkdir -p backups
   cp data/jobs.json backups/jobs-backup-$(date +%Y%m%d_%H%M%S).json
   ```
3. 복구(수동):
   - 복구하려는 백업 파일을 `data/jobs.json`으로 덮어씁니다.
     ```powershell
     Copy-Item -Path "backups\\jobs-backup-20260302_000000.json" -Destination "data\\jobs.json" -Force
     ```
     또는 (macOS/Linux)
     ```bash
     cp backups/jobs-backup-20260302_000000.json data/jobs.json
     ```

주의사항 및 권장사항

- 백업 파일은 중요한 데이터이므로 안전한 장소(내부 백업 서버, 외부 저장소)에 주기적으로 복제하세요.
- 자동 백업 스크립트(예: CI/CD 또는 cron) 또는 수동 스크립트를 만들어 주기적으로 백업하도록 권장합니다.
- 복구 전에 백업 파일이 유효한 JSON인지(파싱 가능한지) 확인하세요. 예:
  ```bash
  node -e "JSON.parse(require('fs').readFileSync('backups/jobs-backup-20260302_000000.json','utf8')); console.log('OK')"
  ```

추가: 향후 확장

- 데이터가 복잡해지면 SQLite, PostgreSQL 같은 DB로 전환을 고려하세요. 파일 기반 DB는 소규모/개발 환경에 적합합니다.
