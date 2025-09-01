import "./globals.css";
import Link from "next/link";

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
          <nav className="max-w-4xl mx-auto flex gap-6 p-4">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <Link href="/vacatures" className="hover:underline">
              Vacatures
            </Link>
            <Link href="/ai" className="hover:underline">
              AI Assistent
            </Link>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
