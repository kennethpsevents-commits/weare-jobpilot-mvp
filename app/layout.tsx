Feitelijk geteste oplossingen

Verwijder het bestand /page.tsx in de root (zorg dat alleen de variant in /app/page.tsx bestaat).

Zet een geldige app/layout.tsx: deze moet de metadata exporteren en een RootLayout‑component bevatten zonder losstaande JSX. Voorbeeld:

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
        <header className="container mx-auto py-4 flex gap-4">
          <a href="/" className="font-semibold">WeAre_JobPilot</a>
          <nav className="ml-auto flex gap-3">
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


Corrigeer je tsconfig.json: voeg "resolveJsonModule": true, "moduleResolution": "bundler", en een alias toe zodat @/... paden werken. Een voorbeeldconfig die dit oplost:

{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}


Controleer dat al je API‑routes correct heten (route.ts) en dat je import { NextResponse } from "next/server" gebruikt – fout gespelde exports leiden tot runtime‑fouten.

Health‑endpoint: voeg app/api/health/route.ts toe (zoals eerder aangereikt) zodat je kunt controleren of de nieuwe build live is. Als deze route niet bestaat of compileert, veroorzaakt dat geen 404’s meer.

Wat je nu concreet moet doen

Verwijder de verdwaalde page.tsx uit de root van de repo.

Commit de bovenstaande aanpassingen in app/layout.tsx en tsconfig.json.

Push naar de main‑branch. Vercel zal automatisch redeployen; open daarna https://wearejobpilot.com/api/health?t=now om te verifiëren. Je zou env: "production" en de nieuwe commit‑hash moeten zien.

Als er nog steeds een buildfout is, open de mislukte deployment in Vercel en klik op Logs. De foutregel verwijst meestal naar één specifiek bestand (bijvoorbeeld jobs.json import). Corrigeer die regel en redeploy opnieuw.

Met deze stappen breng je de projectstructuur weer in lijn met de Next.js‑richtlijnen
vercel.com
 en los je de buildfouten feitelijk op.

Bronnen
