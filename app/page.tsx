import NieuwToegevoegdGrid from "@/components/NieuwToegevoegdGrid";
import AIBuddy from "@/components/AIBuddy";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">WeAreJobPilot</h1>
      <p className="opacity-80 mb-6">Vers binnengekomen vacatures (live).</p>
      <NieuwToegevoegdGrid />
      <div className="mt-10">
        <AIBuddy />
      </div>
    </main>
  );
}
