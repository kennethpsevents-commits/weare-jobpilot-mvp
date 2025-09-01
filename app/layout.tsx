import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "WeAreJobPilot",
  description: "Uw AI-Aangedreven Baanreis Begint Hier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <header className="border-b bg-gray-50">
          <nav className="max-w-5xl mx-auto flex items-center gap-8 p-4">
            {/* Logo links */}
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              {/* Emoji logo 🚀  */}
              <span role="img" aria-label="rocket">🚀</span>
              JobPilot
            </Link>

            {/* Menu rechts */}
            <div className="flex gap-6">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/vacatures" className="hover:underline">
                Vacatures
              </Link>
              <Link href="/ai" className="hover:underline">
                AI Assistent
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
