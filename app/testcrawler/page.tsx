"use client";
import { useState } from "react";
import { crawlGreenhouse } from "@/lib/greenhouse";

export default function TestCrawlerPage() {
  const [status, setStatus] = useState<string>("");

  const run = async () => {
    try {
      setStatus("Bezig…");
      // voorbeeldboard: 'stripe' werkt meestal
      const jobs = await crawlGreenhouse("stripe");
      setStatus(`Klaar: ${jobs.length} jobs opgehaald en opgeslagen.`);
    } catch (e: any) {
      setStatus(`Fout: ${e?.message || e}`);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Testcrawler</h1>
      <button
        onClick={run}
        className="px-4 py-2 rounded bg-black text-white"
      >
        Run Greenhouse (stripe)
      </button>
      <p className="mt-4">{status}</p>
    </main>
  );
}
