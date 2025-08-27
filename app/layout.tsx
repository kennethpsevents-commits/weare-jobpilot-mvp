import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "We Are JobPilot — Find Work Faster",
  description: "AI-ready job search MVP with clean UX.",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <header className="container mx-auto py-4 flex items-center gap-4">
          <a href="/" className="font-semibold">WeAre_JobPilot</a>
          <nav className="ml-auto flex gap-4 text-sm">
            <a href="/vacatures">Vacatures</a>
            <a href="/ai">AI Career Match</a>
            <a href="/employers" className="btn btn-outline">Plaats een vacature</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
