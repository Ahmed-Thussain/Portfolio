# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a single-page Next.js portfolio site with a scroll-driven winding-path project showcase, deployable to Vercel with zero config.

**Architecture:** Next.js 14 (App Router) + TypeScript, statically rendered, no backend/CMS/database. A local data file drives 9 project waypoint cards laid out along an animated SVG path (Framer Motion scroll-linked animation), with a Hero above and Contact below. Mobile collapses the curved path to a straight vertical timeline.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Vitest + React Testing Library (tests), Vercel (deploy).

**Spec:** `docs/superpowers/specs/2026-09-12-portfolio-design.md`

## Global Constraints

- No backend, CMS, or database — content lives in `lib/projects.ts` only.
- No per-project routes/pages — single scrolling page (`app/page.tsx`).
- No contact form — direct links only (email, LinkedIn, GitHub profile).
- No project screenshots/galleries in this version.
- Dark background with one vivid accent color; distinct from the CV's teal (#2D6E7E). This plan uses cyan `#22D3EE` (Tailwind `cyan-400`) as the accent — swap in one place (`tailwind.config.ts`) if Ahmed wants a different hue.
- GitHub contact link points to the profile only (`https://github.com/Ahmed-Thussain`), never to individual repos.
- Below the `md` breakpoint (768px), the curved SVG path is replaced by a straight vertical line; waypoint reveal behavior is unchanged.
- LawyerTech's waypoint card has no "Visit" button (Mizan and Sanad already carry the live links as their own waypoints).

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `next-env.d.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`

**Interfaces:**
- Produces: a running Next.js dev server and a working `next build`, which every later task builds on.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "ahmed-tarek-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "framer-motion": "11.3.19"
  },
  "devDependencies": {
    "typescript": "5.5.4",
    "@types/node": "20.14.15",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "tailwindcss": "3.4.7",
    "postcss": "8.4.40",
    "autoprefixer": "10.4.19",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "vitest": "2.0.5",
    "@vitejs/plugin-react": "4.3.1",
    "jsdom": "24.1.1",
    "@testing-library/react": "16.0.0",
    "@testing-library/jest-dom": "6.4.8"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The Hero avatar starts as an SVG placeholder (Task 5) and may
    // remain SVG or become a raster photo later — allow both through
    // next/image's optimizer rather than special-casing one format.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 5: Create `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#22D3EE",
          dim: "#0E7490",
        },
        ink: {
          DEFAULT: "#0A0A0F",
          soft: "#13131A",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 7: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 8: Create `.gitignore`**

```
node_modules
.next
out
.vercel
*.log
.DS_Store
coverage
```

- [ ] **Step 9: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0f;
  color: #e5e7eb;
}
```

- [ ] **Step 10: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Tarek — Portfolio",
  description:
    "Full-Stack JavaScript & AI Developer — SaaS, ERP/CRM, POS, and AI-integrated products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-gray-200 antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 11: Create a placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-400">Portfolio scaffold OK.</p>
    </main>
  );
}
```

- [ ] **Step 12: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `package-lock.json`.

- [ ] **Step 13: Verify the dev server runs**

Run: `npm run dev` (then stop it with Ctrl+C once confirmed)
Expected: server starts on `http://localhost:3000`; loading it shows "Portfolio scaffold OK." on a dark background.

- [ ] **Step 14: Verify production build succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + TypeScript + Tailwind project"
```

---

## Task 2: Testing infrastructure

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/sanity.test.ts`

**Interfaces:**
- Produces: `npm test` running Vitest with jsdom + React Testing Library available to every later task's tests.

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 2: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write a trivial sanity test**

```ts
// lib/sanity.test.ts
import { describe, it, expect } from "vitest";

describe("test pipeline", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Run it to verify the pipeline works**

Run: `npm test`
Expected: 1 test file, 1 test, PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: set up Vitest + React Testing Library"
```

---

## Task 3: Project data layer

**Files:**
- Create: `lib/projects.ts`
- Test: `lib/projects.test.ts`

**Interfaces:**
- Produces: `Project` type and `projects: Project[]` (9 entries, in path order), consumed by Task 4's `ProjectCard` and Task 7's `PathSection`.

- [ ] **Step 1: Write the failing data-integrity test**

```ts
// lib/projects.test.ts
import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects data", () => {
  it("has exactly 9 projects", () => {
    expect(projects).toHaveLength(9);
  });

  it("is in the spec-defined path order", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "fast-pos",
      "clickly",
      "mizan",
      "sanad",
      "ibi-learning-flows",
      "rakeb",
      "lawyertech",
      "abicerp",
      "xcrp",
    ]);
  });

  it("every project has non-empty name, description, and tech list", () => {
    for (const p of projects) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.tech.length).toBeGreaterThan(0);
    }
  });

  it("status is only Production or In Development", () => {
    for (const p of projects) {
      expect(["Production", "In Development"]).toContain(p.status);
    }
  });

  it("XCRP is the only In Development project and has no url", () => {
    const xcrp = projects.find((p) => p.slug === "xcrp")!;
    expect(xcrp.status).toBe("In Development");
    expect(xcrp.url).toBeUndefined();

    const others = projects.filter((p) => p.slug !== "xcrp");
    for (const p of others) {
      expect(p.status).toBe("Production");
    }
  });

  it("lawyertech has no url (Mizan and Sanad carry the live links instead)", () => {
    const lawyertech = projects.find((p) => p.slug === "lawyertech")!;
    expect(lawyertech.url).toBeUndefined();
  });

  it("known live projects have their confirmed urls", () => {
    const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
    expect(bySlug["rakeb"].url).toBe("https://rakeb.abicex.com");
    expect(bySlug["mizan"].url).toBe("https://mizan.lawyertech.sa");
    expect(bySlug["sanad"].url).toBe("https://sanad.lawyertech.sa");
    expect(bySlug["abicerp"].url).toBe("https://abicerp.com");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `lib/projects.ts` does not exist / has no export `projects`.

- [ ] **Step 3: Write `lib/projects.ts`**

```ts
export type ProjectStatus = "Production" | "In Development";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  contribution: string;
  status: ProjectStatus;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "fast-pos",
    name: "Fast POS & License Manager",
    category: "POS Application · Web / Android · Offline & Online",
    description:
      "POS and business management application supporting offline and online operations, Android and web platforms, and software license management.",
    tech: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Capacitor",
      "React Native",
      "Node.js",
    ],
    contribution:
      "Built from the ground up — POS functionality, business workflows, frontend features, mobile support, and license management.",
    status: "Production",
  },
  {
    slug: "clickly",
    name: "Clickly",
    category: "Cloud Storage SaaS Platform",
    description:
      "Cloud storage platform for file and folder management, including a desktop helper application distributed as an MSI installer.",
    tech: ["PHP", "MariaDB/MySQL", "JavaScript", "C#/.NET", "WiX"],
    contribution:
      "Built from the ground up — platform, cloud storage functionality, frontend/backend, and the desktop upload workflow.",
    status: "Production",
  },
  {
    slug: "mizan",
    name: "Mizan",
    category: "Legal Office Management SaaS",
    description:
      "Legal office management platform supporting case management, clients, documents, billing, users, branches, and business operations.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Radix UI", "Node.js", "MySQL"],
    contribution:
      "Built from the ground up — software development, business workflow design, product features, and platform enhancement.",
    status: "Production",
    url: "https://mizan.lawyertech.sa",
  },
  {
    slug: "sanad",
    name: "Sanad",
    category: "Legal Services SaaS Platform (Saudi Arabia)",
    description:
      "Legal-services platform covering client intake, case/document handling, and payments, with an AI legal assistant built into the product.",
    tech: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js/Express",
      "MariaDB",
      "Stripe",
      "Anthropic Claude",
    ],
    contribution:
      "Built from the ground up — full-stack development and the AI legal-assistant integration.",
    status: "Production",
    url: "https://sanad.lawyertech.sa",
  },
  {
    slug: "ibi-learning-flows",
    name: "IBI Learning Flows",
    category: "E-Learning Platform",
    description:
      "E-learning platform for course delivery and language learning, covering courses, students, and learning workflows.",
    tech: ["Laravel", "Vue.js 3", "Pinia", "Bootstrap 5", "Vite"],
    contribution:
      "Built from the ground up — platform development and feature implementation.",
    status: "Production",
  },
  {
    slug: "rakeb",
    name: "Rakeb",
    category: "Logistics & Delivery SaaS",
    description:
      "Courier/delivery platform connecting merchants and delivery personnel, with mobile apps for both sides plus a web admin panel.",
    tech: ["Laravel", "Flutter", "Dart", "Firebase"],
    contribution:
      "Enhanced an existing platform — implemented new features and client-requested changes.",
    status: "Production",
    url: "https://rakeb.abicex.com",
  },
  {
    slug: "lawyertech",
    name: "LawyerTech",
    category: "Legal Technology Platform — Corporate Site + Portfolio",
    description:
      "Two-part web presence: the main corporate site presenting services, and a separate portfolio/landing page showcasing projects.",
    tech: ["PHP", "Next.js"],
    contribution:
      "Built from the ground up — both the PHP main site and the Next.js portfolio landing page.",
    status: "Production",
  },
  {
    slug: "abicerp",
    name: "ABICERP",
    category: "ERP / CRM Platform",
    description:
      "ERP/CRM platform, built on an open-source Perfex CRM foundation, customized with client-specific features including an Egyptian e-invoicing (ETA) module and accounting functionality.",
    tech: ["PHP", "CodeIgniter", "Laravel Mix", "Tailwind CSS", "MySQL"],
    contribution:
      "Enhanced an existing platform — implemented new modules and client-requested features.",
    status: "Production",
    url: "https://abicerp.com",
  },
  {
    slug: "xcrp",
    name: "XCRP",
    category: "Next-Generation CRM/ERP Platform",
    description:
      "Custom CRM/ERP platform under active development, architected around and integrating open-source foundations (Frappe/ERPNext, Twenty CRM) with custom modules.",
    tech: ["Frappe/ERPNext", "Python"],
    contribution:
      "Built from the ground up — platform architecture and integration work.",
    status: "In Development",
  },
];
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests in `lib/projects.test.ts` PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add project data layer with 9 portfolio entries"
```

---

## Task 4: `ProjectCard` component

**Files:**
- Create: `components/ProjectCard.tsx`
- Test: `components/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: `Project` type from `lib/projects.ts`.
- Produces: `ProjectCard({ project: Project })` React component, consumed by Task 7's `PathSection`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/ProjectCard.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/projects";

const withUrl: Project = {
  slug: "demo",
  name: "Demo Project",
  category: "Demo Category",
  description: "A demo description.",
  tech: ["React", "Node.js"],
  contribution: "Built from the ground up.",
  status: "Production",
  url: "https://example.com",
};

const withoutUrl: Project = { ...withUrl, slug: "demo-2", url: undefined };

describe("ProjectCard", () => {
  it("renders the name, category, description, and tech tags", () => {
    render(<ProjectCard project={withUrl} />);
    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(screen.getByText("Demo Category")).toBeInTheDocument();
    expect(screen.getByText("A demo description.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders a Visit link when a url is present", () => {
    render(<ProjectCard project={withUrl} />);
    const link = screen.getByRole("link", { name: /visit/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders no Visit link when url is absent", () => {
    render(<ProjectCard project={withoutUrl} />);
    expect(screen.queryByRole("link", { name: /visit/i })).toBeNull();
  });

  it("shows the status badge", () => {
    render(<ProjectCard project={withUrl} />);
    expect(screen.getByText("Production")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `components/ProjectCard.tsx` does not exist.

- [ ] **Step 3: Write `components/ProjectCard.tsx`**

```tsx
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-ink-soft/80 p-6 backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-mono ${
            project.status === "Production"
              ? "bg-accent/20 text-accent"
              : "bg-white/10 text-gray-300"
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="mb-2 text-sm italic text-gray-400">{project.category}</p>
      <p className="mb-4 text-sm text-gray-300">{project.description}</p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-accent"
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="mb-4 text-xs text-gray-500">{project.contribution}</p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-ink hover:bg-accent/80"
        >
          Visit →
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests in `components/ProjectCard.test.tsx` PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ProjectCard component"
```

---

## Task 5: `Hero` component

**Files:**
- Create: `components/Hero.tsx`
- Test: `components/Hero.test.tsx`
- Create: `public/avatar-placeholder.svg`

**Interfaces:**
- Produces: `Hero()` React component, consumed by Task 8's `app/page.tsx`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/Hero.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the name and tagline", () => {
    render(<Hero />);
    expect(screen.getByText("Ahmed Tarek")).toBeInTheDocument();
    expect(
      screen.getByText(/full-stack javascript & ai developer/i)
    ).toBeInTheDocument();
  });

  it("renders the avatar image", () => {
    render(<Hero />);
    expect(screen.getByAltText(/ahmed tarek/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `components/Hero.tsx` does not exist.

- [ ] **Step 3: Create a placeholder avatar asset**

```svg
<!-- public/avatar-placeholder.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="24" fill="#13131A" />
  <circle cx="160" cy="130" r="60" fill="#22D3EE" fill-opacity="0.2" />
  <circle cx="160" cy="130" r="40" fill="#22D3EE" fill-opacity="0.4" />
  <rect x="70" y="210" width="180" height="90" rx="20" fill="#22D3EE" fill-opacity="0.15" />
  <text x="160" y="270" text-anchor="middle" font-family="ui-monospace, monospace" font-size="14" fill="#67E8F9">
    photo pending
  </text>
</svg>
```

This is a temporary placeholder — swap `public/avatar-placeholder.svg` for the real photo file (e.g. `public/avatar.jpg`) and update the `src` in `Hero.tsx` once Ahmed supplies it.

- [ ] **Step 4: Write `components/Hero.tsx`**

```tsx
import Image from "next/image";

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Image
        src="/avatar-placeholder.svg"
        alt="Ahmed Tarek"
        width={200}
        height={200}
        className="rounded-full border-2 border-accent/40"
        priority
      />
      <h1 className="text-4xl font-bold text-white sm:text-5xl">
        Ahmed Tarek
      </h1>
      <p className="max-w-xl text-lg text-gray-300">
        Full-Stack JavaScript &amp; AI Developer — SaaS, ERP/CRM, POS, and
        AI-integrated products.
      </p>
      <div className="mt-8 animate-bounce text-accent" aria-hidden="true">
        ↓ scroll
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests in `components/Hero.test.tsx` PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Hero component with placeholder avatar"
```

---

## Task 6: `Contact` component

**Files:**
- Create: `components/Contact.tsx`
- Test: `components/Contact.test.tsx`

**Interfaces:**
- Produces: `Contact()` React component, consumed by Task 8's `app/page.tsx`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/Contact.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("links to the correct email, LinkedIn, and GitHub profile", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:ahmedtarekk.2220@gmail.com"
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ahmedd-tarekk/"
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/Ahmed-Thussain"
    );
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `components/Contact.tsx` does not exist.

- [ ] **Step 3: Write `components/Contact.tsx`**

```tsx
const LINKS = [
  {
    label: "Email",
    href: "mailto:ahmedtarekk.2220@gmail.com",
    display: "ahmedtarekk.2220@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmedd-tarekk/",
    display: "linkedin.com/in/ahmedd-tarekk",
  },
  {
    label: "GitHub",
    href: "https://github.com/Ahmed-Thussain",
    display: "github.com/Ahmed-Thussain",
  },
];

export function Contact() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h2 className="text-2xl font-semibold text-white">
        End of the path — let's talk
      </h2>
      <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={l.label}
              className="font-mono text-sm text-accent hover:underline"
            >
              {l.display}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests in `components/Contact.test.tsx` PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Contact component"
```

---

## Task 7: Winding path data + `PathSection` component

**Files:**
- Create: `lib/windingPath.ts`
- Test: `lib/windingPath.test.ts`
- Create: `components/PathSection.tsx`
- Test: `components/PathSection.test.tsx`

**Interfaces:**
- Consumes: `projects` from `lib/projects.ts` (Task 3), `ProjectCard` from `components/ProjectCard.tsx` (Task 4).
- Produces: `buildWindingPath(count: number, segmentHeight: number, width: number): string` (SVG path `d` string) and `PathSection()` React component, consumed by Task 8's `app/page.tsx`.

- [ ] **Step 1: Write the failing test for the path-building helper**

```ts
// lib/windingPath.test.ts
import { describe, it, expect } from "vitest";
import { buildWindingPath } from "./windingPath";

describe("buildWindingPath", () => {
  it("starts at the horizontal center and top", () => {
    const d = buildWindingPath(3, 600, 400);
    expect(d.startsWith("M 200 0")).toBe(true);
  });

  it("produces one cubic bezier segment per waypoint", () => {
    const d = buildWindingPath(4, 600, 400);
    const curveCount = d.split("C").length - 1;
    expect(curveCount).toBe(4);
  });

  it("total height matches count * segmentHeight", () => {
    const d = buildWindingPath(5, 600, 400);
    // last coordinate pair in the path should end at y = 5 * 600 = 3000
    expect(d.trim().endsWith("400 3000")).toBe(true);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `lib/windingPath.ts` does not exist.

- [ ] **Step 3: Write `lib/windingPath.ts`**

```ts
/**
 * Builds an SVG path `d` string that winds left-right down the page,
 * one S-curve segment per waypoint. The path starts at the horizontal
 * center of `width` and alternates toward the left and right edges,
 * ending the final segment at the right edge (x = width) so the drawn
 * path has an unambiguous, testable end coordinate.
 */
export function buildWindingPath(
  count: number,
  segmentHeight: number,
  width: number
): string {
  const center = width / 2;
  const amplitude = width / 2;

  let d = `M ${center} 0`;

  for (let i = 0; i < count; i++) {
    const startY = i * segmentHeight;
    const endY = startY + segmentHeight;
    const isLast = i === count - 1;
    const goingRight = i % 2 === 0;
    const targetX = isLast ? width : goingRight ? center + amplitude : center - amplitude;
    const controlY1 = startY + segmentHeight / 3;
    const controlY2 = startY + (segmentHeight * 2) / 3;

    d += ` C ${center} ${controlY1}, ${targetX} ${controlY2}, ${targetX} ${endY}`;
  }

  return d;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests in `lib/windingPath.test.ts` PASS.

- [ ] **Step 5: Write the failing test for `PathSection`**

```tsx
// components/PathSection.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PathSection } from "./PathSection";
import { projects } from "@/lib/projects";

describe("PathSection", () => {
  it("renders every project's name once, in data order", () => {
    render(<PathSection />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual(
      projects.map((p) => p.name)
    );
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `components/PathSection.tsx` does not exist.

- [ ] **Step 7: Write `components/PathSection.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { buildWindingPath } from "@/lib/windingPath";

const SEGMENT_HEIGHT = 600;
const SVG_WIDTH = 400;

export function PathSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const totalHeight = projects.length * SEGMENT_HEIGHT;
  const d = buildWindingPath(projects.length, SEGMENT_HEIGHT, SVG_WIDTH);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      {/* Desktop/tablet: curved SVG path */}
      <svg
        className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 md:block"
        width={SVG_WIDTH}
        height={totalHeight}
        viewBox={`0 0 ${SVG_WIDTH} ${totalHeight}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d={d}
          stroke="#22D3EE33"
          strokeWidth={2}
          fill="none"
        />
        <motion.path
          d={d}
          stroke="#22D3EE"
          strokeWidth={3}
          fill="none"
          style={{ pathLength }}
        />
      </svg>

      {/* Mobile: straight vertical line */}
      <div
        className="pointer-events-none absolute left-6 top-0 w-0.5 bg-accent/30 md:hidden"
        style={{ height: totalHeight }}
        aria-hidden="true"
      />

      {/* Waypoints */}
      <ul>
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="flex items-center px-6 md:px-0"
            style={{
              height: SEGMENT_HEIGHT,
              justifyContent:
                i % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <div className="md:w-[45%]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests in `components/PathSection.test.tsx` PASS.

- [ ] **Step 9: Manual QA (not automated — scroll/animation feel)**

Run: `npm run dev`, open `http://localhost:3000` in a browser at desktop
width, and scroll through the path section. Confirm:
- The cyan path line draws in as you scroll (not just the pale
  background track).
- Each project card fades/slides into view as it's reached.
- Resizing the browser below 768px width shows the straight vertical
  line instead of the curve, with the same card reveal behavior.

This step has no pass/fail assertion to run — note the outcome in the
task's commit message or a follow-up comment if anything looks off.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add winding path helper and PathSection component"
```

---

## Task 8: Compose the page and layout

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Hero` (Task 5), `PathSection` (Task 7), `Contact` (Task 6).

- [ ] **Step 1: Replace `app/page.tsx` with the composed page**

```tsx
import { Hero } from "@/components/Hero";
import { PathSection } from "@/components/PathSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <PathSection />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: all tests across `lib/` and `components/` PASS.

- [ ] **Step 3: Verify production build succeeds**

Run: `npm run build`
Expected: build completes with no errors or type errors.

- [ ] **Step 4: Manual QA**

Run: `npm run dev` and click through the full page top to bottom:
Hero → 9 project waypoints in the documented order → Contact. Confirm
`Visit` buttons appear only on Mizan, Sanad, Rakeb, and ABICERP.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: compose Hero, PathSection, and Contact into the home page"
```

---

## Task 9: Deployment readiness

**Files:**
- Create: `README.md`

**Interfaces:**
- None — this task produces documentation and a verified deployable build, not code other tasks depend on.

- [ ] **Step 1: Write `README.md`**

```md
# Ahmed Tarek — Portfolio

Single-page portfolio built with Next.js 14, TypeScript, Tailwind CSS, and
Framer Motion. Showcases projects as waypoints along a scroll-driven
winding path.

## Development

​```bash
npm install
npm run dev
​```

Open http://localhost:3000.

## Testing

​```bash
npm test
​```

## Build

​```bash
npm run build
​```

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
```

- [ ] **Step 2: Run the full test suite one final time**

Run: `npm test`
Expected: all tests PASS.

- [ ] **Step 3: Run the production build one final time**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: add README with dev, test, and Vercel deploy instructions"
```

- [ ] **Step 5: Report deployment step to Ahmed (manual, outside this plan)**

Vercel project creation and the first deploy require Ahmed's Vercel
account — this plan stops at "ready to deploy." Point Ahmed to either
connecting the repo in the Vercel dashboard, or running `npx vercel`
from the project root and following its prompts.
