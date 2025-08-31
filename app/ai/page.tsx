"use client";
import { useState } from "react";

export default function AICareerMatchPage() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string>(""); // comma-separated in input
  const [location, setLocation] = useState("");
  const [seniority, setSeniority] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResp(null);
    try {
      const r = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean),
          location,
          seniority
        }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json?.error || "Request failed");
      setResp(json);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">AI Career Match</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Target role"
          value={role} onChange={e=>setRole(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Skills (comma separated)"
          value={skills} onChange={e=>setSkills(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2 w-full" placeholder="Location"
            value={location} onChange={e=>setLocation(e.target.value)} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Seniority"
            value={seniority} onChange={e=>setSeniority(e.target.value)} />
        </div>
        <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">
          {loading ? "Analyzing..." : "Find matches"}
        </button>
      </form>

      {error && <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      {resp && (
        <div className="p-4 border rounded">
          <div className="text-xs text-gray-500 mb-2">mode: {resp.mode}</div>
          <div className="font-semibold mb-1">{resp.result?.summary}</div>
          <div className="mt-2">
            <div className="font-medium">Top roles</div>
            <ul className="list-disc ml-5">
              {(resp.result?.top_roles ?? []).map((x: string) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="mt-2">
            <div className="font-medium">Skills to add</div>
            <ul className="list-disc ml-5">
              {(resp.result?.skills_to_add ?? []).map((x: string) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
