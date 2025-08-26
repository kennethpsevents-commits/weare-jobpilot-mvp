"use client";
import { useState } from "react";

export default function AIBuddy() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  async function handleSend() {
    if (!input.trim()) return;
    setHistory([...history, "👤: " + input, "🤖: ik zoek vacatures…"]);
    setInput("");
    // hier later koppelen aan echte AI of /api/crawl
  }

  return (
    <div className="border rounded-2xl p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">AI Buddy</h2>
      <div className="h-48 overflow-y-auto border p-2 mb-3 rounded">
        {history.map((line,i)=><p key={i}>{line}</p>)}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-grow"
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Typ je vraag…"
        />
        <button onClick={handleSend}
          className="bg-blue-600 text-white px-3 rounded">
          Stuur
        </button>
      </div>
    </div>
  );
}
