import "./globals.css";
import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "WeAre_JobPilot – Find your dream job with ease",
  description: "Modern job search with AI buddy. NL/EN.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analyticsEnabled = typeof window === "undefined" ? true : (localStorage.getItem("cookie-consent")==="granted");
  return (
    <html lang="nl">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="container h-16 flex items-center justify-between">
            <a className="flex items-center gap-2 font-extrabold text-brand" href="/">
              <img src="/logo.svg" alt="WeAre_JobPilot" width="32" height="32" />
              <span>WeAre</span><span className="text-black">_JobPilot</span>
            </a>
            <nav className="flex items-center gap-4 text-sm">
              <a className="link" href="/#jobs">Vacatures</a>
              <a className="link" href="/employers">Voor Werkgevers</a>
              <a className="link" href="/ai">AI Career Match</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="py-10 mt-10">
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold mb-3">Over JobPilot</h3>
              <ul className="space-y-2">
                <li><a className="link" href="/legal/privacy">Privacy</a></li>
                <li><a className="link" href="/legal/terms">Voorwaarden</a></li>
                <li><a className="link" href="/legal/cookies">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Voor Werkzoekenden</h3>
              <ul className="space-y-2">
                <li><a className="link" href="/#jobs">Vacatures zoeken</a></li>
                <li><a className="link" href="/ai">AI Career Match</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Voor Werkgevers</h3>
              <ul className="space-y-2">
                <li><a className="link" href="/employers">Plaats een vacature</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400">© 2025 WeAre_JobPilot. Alle rechten voorbehouden.</div>
        </footer>
        <CookieConsent />
        {/* Plausible (only injected when consented on client; SSR fallback keeps tag present) */}
        <script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ""}
          src={process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js"}
        />
      </body>
    </html>
  );
}
