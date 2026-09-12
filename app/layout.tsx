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
