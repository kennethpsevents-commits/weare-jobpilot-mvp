import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">WeAreJobPilot</h1>
      <p className="mb-6">Uw AI-Aangedreven Baanreis Begint Hier.</p>
      <Link href="/vacatures" className="inline-block px-4 py-2 rounded bg-black text-white">
        Bekijk vacatures
      </Link>
    </main>
  );
}
