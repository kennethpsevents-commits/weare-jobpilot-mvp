"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AICoachPage() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [chat, setChat] = useState<Msg[]>([
    { role: "assistant", content: "Hey! Ik ben je JobPilot-coach. Waar wil je mee starten: cv, motivatie, of passende vacatures?" },
  ]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [chat]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const nextChat = [...chat, { role: "user", content: text }];
    setChat(nextChat);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: nextChat }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || "AI fout");
      setChat((c) => [...c, { role: "assistant", content: (d.reply || "").toString() }]);
    } catch (e: any) {
      setChat((c) => [...c, { role: "assistant", content: "Er ging iets mis. Probeer het zo nog eens." }]);
    } finally {
      setBusy(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-3">AI Coach</h1>
      <div ref={scroller} className="h-[60vh] overflow-y-auto rounded-2xl border p-3 bg-white" aria-live="polite">
        {chat.map((m, i) => (
          <div key={i} className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-900"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {busy && <div className="text-xs text-neutral-500 italic">Coach is aan het typen…</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded-xl border px-3 py-2"
          placeholder="Stel je vraag (bijv. ‘Help mijn cv voor remote roles’)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          aria-label="Bericht aan de coach"
        />
        <button onClick={send} disabled={busy} className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50">
          Verstuur
        </button>
      </div>
    </main>
  );
}
