"use client";
import { useEffect, useState } from "react";
import { crawlGreenhouse } from "@/lib/greenhouse";

export default function TestCrawlerPage() {
  const [status, setStatus] = useState("Starting…");
  useEffect(() => {
    (async () => {
      try {
        setStatus("Fetching…");
        const jobs = await crawlGreenhouse("stripe");
        setStatus(`OK: ${jobs.length} jobs`);
      } catch (e: any) {
        setStatus(`Error: ${e?.message ?? String(e)}`);
      }
    })();
  }, []);
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Crawler test</h1>
      <p className="mt-2">{status}</p>
    </main>
  );
}
