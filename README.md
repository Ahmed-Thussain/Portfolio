# Ahmed Tarek — Portfolio

Single-page portfolio built with Next.js, TypeScript, Tailwind CSS, and
Framer Motion. Showcases projects as waypoints along a scroll-driven
winding path.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Testing

```bash
npm test
```

## Build

```bash
npm run build
```

## Deployment (Vercel)

This project needs no environment variables or backend services — it is
fully static. Deploy by connecting this repository to Vercel (or running
`npx vercel` from this directory) and accepting the default Next.js
build settings.

## Content updates

Project entries live in `lib/projects.ts`. Add, edit, or reorder entries
there and redeploy — no other file needs to change for a content-only
update.

## Pending asset

`public/avatar-placeholder.svg` is a placeholder. Replace it with the
real photo (e.g. `public/avatar.jpg`) and update the `src` prop in
`components/Hero.tsx` once the photo is supplied.

## Notable deviations from the original plan

- **Next.js 16.3.5 / React 19.3.0** instead of the plan's pinned Next
  14.2.5 / React 18.3.1 — Next 14.2.5 had multiple critical CVEs
  (including unauthenticated RCE) only patched at 15.5.24+; since this
  was a greenfield install with nothing depending on the older API,
  latest stable was used instead of a minimal patch bump.
- **ESLint 10 with flat config** (`eslint.config.mjs`) instead of
  `.eslintrc.json` — `eslint-config-next` 16 requires ESLint >=9, which
  dropped support for the legacy config format.
- `npm audit` reports 0 vulnerabilities as of the last dependency
  install.
