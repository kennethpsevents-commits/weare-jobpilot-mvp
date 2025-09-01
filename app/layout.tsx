import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "WeAreJobPilot",
  description: "Uw AI-Aangedreven Baanreis Begint Hier",
};

const noFlashScript = `
(function(){
  try{
    var s = localStorage.getItem('theme');
    var dark = s ? s==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(dark) document.documentElement.classList.add('dark');
  }catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <header className="border-b bg-gray-50 dark:bg-[#111]">
          <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <span role="img" aria-label="rocket">🚀</span>
              <Link href="/">JobPilot</Link>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/vacatures" className="hover:underline">Vacatures</Link>
              <Link href="/ai" className="hover:underline">AI Assistent</Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
