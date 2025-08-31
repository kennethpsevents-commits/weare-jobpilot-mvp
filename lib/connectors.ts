// lib/connectors.ts
import { Job } from './types';

const toIso = (x: any) => {
  const d = new Date(x);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

// Greenhouse
export async function getGreenhouse(board: string): Promise<Job[]> {
  const res = await fetch(`https://${board}.greenhouse.io/embed/jobs?format=json`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data?.jobs ?? []).map((j: any) => ({
    id: `${board}-${j.id}`,
    title: j.title,
    company: board,
    location: j?.location?.name ?? 'Unknown',
    applyUrl: j.absolute_url,
    createdAt: toIso(j?.updated_at ?? j?.created_at),
    remote: (j?.location?.name ?? '').toLowerCase().includes('remote'),
    source: 'greenhouse',
  }));
}

// Lever
export async function getLever(board: string): Promise<Job[]> {
  const res = await fetch(`https://api.lever.co/v0/postings/${board}?mode=json`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data ?? []).map((j: any) => ({
    id: `${board}-${j.id}`,
    title: j.text,
    company: board,
    location: j?.categories?.location ?? 'Unknown',
    applyUrl: j.applyUrl,
    createdAt: toIso(j?.createdAt),
    remote: (j?.categories?.location ?? '').toLowerCase().includes('remote'),
    source: 'lever',
  }));
}

// Placeholders (laten staan om build te beschermen)
export async function getAshby(_b: string): Promise<Job[]> { return []; }
export async function getWorkable(_b: string): Promise<Job[]> { return []; }
export async function getTeamtailor(_b: string): Promise<Job[]> { return []; }
