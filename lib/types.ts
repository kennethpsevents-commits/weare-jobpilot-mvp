// lib/types.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  applyUrl: string;
  createdAt: string; // ISO
  remote: boolean;
  source?: string;   // 'greenhouse' | 'lever' | ...
}
