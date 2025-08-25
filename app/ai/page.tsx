"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  createdAt: string;
  source: string;
};

export default function AICareerMatchPage() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [seniority, setSeniority] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Job[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location, seniority }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Kon geen matches ophalen");
      setResults(data.results || []);
    } catch (err: any) {
      setError(err?.message || "Er ging iets mis");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">AI Career Match</h1>
      <p className="text-sm opacity-80 mb-6">
        Vul je rol, skills en locatie in. Je krijgt 3 snelle suggesties uit live vacatures.
      </p>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 mb-8">
        <input className="border rounded-xl p-2" placeholder="Rol (bv. Frontend Engineer)"
               value={role} onChange={e => setRole(e.target.value)} />
        <input className="border rounded-xl p-2" placeholder="Skills (React, TypeScript, AWS)"
               value={skills} onChange={e => setSkills(e.target.value)} />
        <input className="border rounded-xl p-2" placeholder="Locatie (Amsterdam of Remote)"
               value={location} onChange={e => setLocation(e.target.value)} />
        <input className="border rounded-xl p-2" placeholder="Senioriteit (junior/mid/senior/lead)"
               value={seniority} onChange={e => setSeniority(e.target.value)} />
        <div className="md:col-span-2">
          <button type="submit" className="border rounded-xl px-4 py-2 hover:shadow-sm transition" disabled={loading}>
            {loading ? "Bezig…" : "Get suggestions"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {results && results.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Jouw 3 matches</h2>
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(job => <JobCard key={job.id} job={job} />)}
          </section>
        </>
      )}

      {results && results.length === 0 && !loading && (
        <p className="opacity-70">Geen matches gevonden. Probeer je zoekwoorden te versimpelen.</p>
      )}
    </main>
  );
}
