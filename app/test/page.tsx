"use client";
import { useState } from "react";

export default function TestCoachPage() {
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function pingCoach() {
    setLoading(true);
    setReply(null);
    try {
      const r = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [{ role: "user", content: "Ping test — ben je er coach?" }],
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || "API fout");
      setReply(d.reply);
    } catch (e: any) {
      setReply("❌ Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Test Coach API</h1>
      <button
        onClick={pingCoach}
        className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Bezig..." : "Ping Coach"}
      </button>
      {reply && (
        <p className="mt-4 p-3 border rounded bg-neutral-50">{reply}</p>
      )}
    </main>
  );
}
