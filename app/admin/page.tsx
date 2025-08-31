"use client";
import { useEffect, useState } from "react";

type Status = {
  ok: boolean;
  error?: string;
  count?: number;
  tookMs?: number;
  sample?: { id: string; title: string; company?: string; source?: string } | null;
};

export default function AdminPage() {
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/status", { headers: { "x-admin-token": token } });
      // status endpoint is public in dit kleine voorbeeld; token check kun je later in route toevoegen
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  async function runIngest() {
    if (!token) return;
    setIngesting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/ingest", { method: "POST", headers: { "x-admin-token": token } });
      const json = await res.json();
      console.log("ingest result", json);
      await load();
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setIngesting(false);
    }
  }

  useEffect(() => { /* no auto-load */ }, []);

  const c = (s?: Status) =>
    s?.ok ? "bg-green-600 text-white" : "bg-red-600 text-white";

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <input
          type="password"
          placeholder="Admin token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border rounded px-3 py-2 w-80"
        />
        <button onClick={load} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60" disabled={!token || loading}>
          {loading ? "Loading..." : "Refresh status"}
        </button>
        <button onClick={runIngest} className="px-4 py-2 rounded bg-amber-600 text-white disabled:opacity-60" disabled={!token || ingesting}>
          {ingesting ? "Running..." : "Run ingest"}
        </button>
      </div>

      {error && <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      {data && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">Last check: {new Date(data.time).toLocaleString()}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.connectors).map(([name, s]: any) => (
              <div key={name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold">{name}</h2>
                  <span className={`text-xs px-2 py-1 rounded ${c(s)}`}>
                    {s?.ok ? "OK" : "ERROR"}
                  </span>
                </div>
                <div className="text-sm">
                  <div>Count: {s?.count ?? 0}</div>
                  <div>Took: {s?.tookMs ?? 0} ms</div>
                  {s?.error && <div className="text-red-700 mt-1 break-all">Error: {s.error}</div>}
                  {s?.sample && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <div className="font-medium">{s.sample.title}</div>
                      <div className="text-xs text-gray-600">{s.sample.company ?? ""}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <a className="text-blue-700 underline" href="https://vercel.com/kenneth-vredens-projects/weare-jobpilot-mvp/deployments" target="_blank" rel="noreferrer">
              Open Vercel deployments
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
