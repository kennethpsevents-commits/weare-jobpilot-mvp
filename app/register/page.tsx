// app/register/page.tsx
"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const supabase = getSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("ok");
      setMessage("Check je e-mail om je registratie te bevestigen.");
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registreren</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="border rounded-xl p-3"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Wachtwoord"
          required
          className="border rounded-xl p-3"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl p-3 bg-black text-white disabled:opacity-60"
        >
          {status === "loading" ? "Bezig…" : "Account aanmaken"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}>{message}</p>
      )}
    </main>
  );
}
