import NieuwToegevoegdGrid from "@/components/NieuwToegevoegdGrid";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">WeAreJobPilot</h1>
      <p className="opacity-80 mb-6">Vers binnengekomen vacatures (live uit Greenhouse).</p>
      <NieuwToegevoegdGrid />
    </main>
  );
}
