"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Employers() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string|undefined>();
  const [err, setErr] = useState<string|undefined>();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setLoading(true); setErr(undefined); setOk(undefined);
    try {
      const r = await fetch("/api/employer/lead", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(await r.text());
      setOk("Thanks! We will contact you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } catch (e:any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-extrabold mb-2">For Employers</h1>
      <p className="text-gray-600 mb-6">Pilot pricing: <b>€10 / 30 PLN</b> per job post, <b>+€10</b> for Boost. Cancel anytime.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-3">Submit a Lead</h2>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Company</label>
              <Input name="company" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input type="email" name="email" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Plan</label>
              <select name="plan" className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm" defaultValue="post">
                <option value="post">Job Post</option>
                <option value="boost">Job Post + Boost</option>
                <option value="starter">Starter Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea name="message" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" rows={4} placeholder="Describe your roles and needs..."></textarea>
            </div>
            <Button variant="primary" disabled={loading}>{loading ? "Sending..." : "Send"}</Button>
          </form>
          {ok && <p className="text-green-600 mt-3">{ok}</p>}
          {err && <p className="text-red-600 mt-3">{err}</p>}
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold mb-3">What you get</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Targeted audience (18–30, NL/PL/DE)</li>
            <li>AI‑assisted candidate matching (MVP)</li>
            <li>Featured placement with Boost</li>
            <li>Simple monthly plan, no lock‑in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
