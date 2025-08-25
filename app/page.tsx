"use client";

import NieuwToegevoegdGrid from "@/components/NieuwToegevoegdGrid";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">We Are JobPilot – Vacatures</h1>
        <p className="text-neutral-600 mt-1">
          Ontdek de nieuwste banen van onze partners en solliciteer direct.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Nieuw toegevoegde vacatures</h2>
        <NieuwToegevoegdGrid />
      </section>
    </main>
  );
}
