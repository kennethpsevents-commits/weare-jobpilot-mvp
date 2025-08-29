"use client";

import { useState } from "react";

type Msg = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [chat, setChat] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSend() {
    if (!input || busy) return;

    const nextChat: Msg[] = [...chat, { role: "user", content: input }];
    setChat(nextChat);
    setInput("");
    setBusy(true);

    try {
      // voorbeeld call naar je eigen API
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextChat }),
      });
      const data = await res.json();

      setChat([...nextChat, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      setChat([...nextChat, { role: "assistant", content: "Error: " + err.message }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">AI Career Match</h1>

      <div className="space-y-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
            }`}
          >
            <strong>{msg.role}: </strong>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Typ je vraag..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSend}
          disabled={busy}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Verstuur
        </button>
      </div>
    </main>
  );
}
