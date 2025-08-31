'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => onAuthStateChanged(getAuth(), setUser), []);
  useEffect(() => {
    if (!user) return;
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => setStats(null));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6">
        <p className="mb-3">Not signed in.</p>
        <a className="underline" href="/login">Go to login</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="p-4 border rounded">
        <div className="font-medium">Jobs in Firestore</div>
        <div className="text-3xl">{stats?.jobs ?? '—'}</div>
      </div>
      <div className="p-4 border rounded">
        <div className="font-medium mb-2">Actions</div>
        <a className="px-3 py-2 rounded bg-black text-white" href="/api/admin/ingest-cron">Run ingest now</a>
      </div>
    </div>
  );
}
