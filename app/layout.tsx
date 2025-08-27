import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "We Are JobPilot — Find Work Faster",
  description: "AI-ready job search MVP with clean UX.",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
