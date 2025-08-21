import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "We Are JobPilot — Find Work Faster",
  description: "AI-ready job search MVP with clean UX.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
