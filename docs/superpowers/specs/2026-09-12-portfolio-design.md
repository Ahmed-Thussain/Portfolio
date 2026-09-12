# Portfolio Site — Design Spec

Date: 2026-09-12
Owner: Ahmed Tarek

## Purpose

A personal portfolio site, separate from the CV, showcasing Ahmed's software
projects with links to the ones that are live. Deployed on Vercel. Built as
simply as possible while delivering one deliberate visual "twist": a
scroll-driven winding path that reveals projects as waypoints, instead of a
conventional scrolling list.

## Goals

- Single, simple, statically-built site — no backend, no CMS, no database.
- Showcase all 9 projects from the CV, each with full detail (description,
  tech stack, contribution, status) and a "Visit" button where a live URL
  exists.
- A distinct visual identity from the CV — modern, dark, developer-portfolio
  aesthetic — not a reuse of the CV's teal/serif branding.
- The scroll experience is the differentiator: a literal winding path with
  projects as waypoints along it, not a plain top-to-bottom scroll.
- Deploys cleanly to Vercel with no configuration beyond a standard Next.js
  build.

## Non-goals

- No CMS or database — content changes are made by editing a local data file
  and redeploying.
- No blog, no per-project detail pages/routes — this is a single scrolling
  page.
- No contact form — contact is via direct links (email, LinkedIn, GitHub).
- No project screenshots/galleries in this version (can be added later as a
  separate enhancement).

## Tech stack

- **Next.js 14** (App Router), TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for scroll-linked animation (SVG path draw, waypoint
  reveal-on-scroll)
- **Vercel** for deployment (zero-config `next build`)

## Content model

A single local data file, `data/projects.ts`, exporting an array of project
objects:

```ts
type Project = {
  slug: string;
  name: string;
  category: string;       // e.g. "POS Application", "Legal Services SaaS"
  description: string;
  tech: string[];
  contribution: string;   // e.g. "Built from the ground up" / "Enhanced an existing platform"
  status: "Production" | "In Development";
  url?: string;            // live link, omitted if none
};
```

Order (top to bottom along the path), matching the CV and ending on the
in-development project as the "road ahead":

1. Fast POS & License Manager
2. Clickly
3. Mizan
4. Sanad
5. IBI Learning Flows
6. Rakeb — `https://rakeb.abicex.com`
7. LawyerTech — no "Visit" button; descriptive card only (see note below)
8. ABICERP — `https://abicerp.com`
9. XCRP (status: In Development, no live link)

Note: Mizan and Sanad already have their own waypoints (2 and 4 respectively)
carrying the live `mizan.lawyertech.sa` and `sanad.lawyertech.sa` links. The
LawyerTech waypoint (7) covers the corporate/legal-tech platform itself
(main PHP services site + Next.js portfolio page, per the CV) as a
distinct entry from those two products, and does not duplicate either
link. If Ahmed provides a root `lawyertech.sa` URL later, a "Visit" button
can be added to this card in a follow-up edit.

## Page structure

Single page (`app/page.tsx`), composed top to bottom:

1. **Hero** — name, title/tagline, avatar photo (new pose, supplied
   separately by Ahmed), scroll-down cue.
2. **Path section** — an SVG path rendered behind/through the project
   waypoints, animated via Framer Motion's scroll-linked `pathLength` so it
   draws progressively as the user scrolls. Each of the 9 projects is a
   waypoint: a full-detail card (name, description, tech tags, contribution,
   status, "Visit" button if `url` is set) that fades/scales into view via
   `whileInView` as it's reached. A small marker travels along the path
   tracking scroll progress.
3. **Contact** — framed as the path's destination. Email, LinkedIn, GitHub
   profile links (GitHub links to the profile only, consistent with keeping
   private repos private).

### Mobile behavior

Below a defined breakpoint (Tailwind `md`, 768px), the literal curved path
is replaced by a straight vertical timeline line with the same
waypoint-reveal behavior. The curved SVG path is a desktop/tablet-width
enhancement, not a requirement on narrow screens, since a winding curve
becomes illegible at phone width.

## Visual style

- Dark background (near-black), one vivid accent color (electric
  cyan/emerald direction) for the path line, waypoint highlights, and
  interactive elements — deliberately distinct from the CV's teal so the two
  documents don't read as the same artifact.
- Clean sans-serif headings; monospace styling for tech-stack tags.
- No component library dependency beyond Tailwind utility classes and
  hand-built components — keeps the bundle small and avoids unused-library
  weight for a single-page site.

## Assets

- Avatar photo: to be supplied by Ahmed (different pose than the CV
  headshot). Not required to start scaffolding/implementation; required
  before the hero section is finished.

## Deployment

- Vercel, connected to this repo (or `vercel` CLI deploy for a first
  manual deploy). No environment variables required — the site has no
  external API calls or secrets.

## Open items carried into implementation

- Exact accent color (cyan vs. emerald vs. another hue) — implementer picks
  a specific value consistent with "vivid, dark-background-friendly" and
  Ahmed can request a swap after seeing it live.
- Avatar photo file — needed before the hero section is finished; can be
  scaffolded with a placeholder until supplied.
