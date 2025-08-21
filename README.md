# WeAre_JobPilot – MVP (Next.js 14)

Design is fixed. This repo ships the full MVP: jobs list + filtering, NL/EN, employers lead form, AI intake, legal pages, cookie consent, sitemap/robots, and basic security headers.

## Quick Start
```bash
pnpm i   # or: npm i  /  yarn
pnpm dev # -> http://localhost:3000
```

## Environment
Create `.env.local` (optional):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=wearejobpilot.com
NEXT_PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.js
SLACK_WEBHOOK_URL=
```

## Deploy on Vercel
1. Push this folder to a Git repo (or import directly in Vercel).
2. In Vercel → Add Project → select repo → set env vars (above).
3. Add `wearejobpilot.com` in Vercel Domains.
4. In Namecheap: point `www` CNAME to `cname.vercel-dns.com` and apex A records to Vercel (or switch nameservers to Vercel).

## Notes
- Jobs served from `/api/jobs` reading `/data/jobs.*.json`.
- Employer leads POST to `/api/employer/lead` (optionally forwarded to Slack if `SLACK_WEBHOOK_URL` is set). Always returns `202`.
- AI intake at `/api/ai/intake` uses a simple heuristic score over the seeded jobs to suggest 3 roles.
- Cookie consent gates analytics visually; you can extend to actually block the script execution client‑side if needed.
