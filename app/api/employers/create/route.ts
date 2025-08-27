import { NextResponse } from "next/server";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  description?: string;
  createdAt: string; // ISO string
};

// Dummy data: je kunt dit later vervangen door echte data/DB
const jobs: Job[] = [
  {
    id: "emp-001",
    title: "Frontend Developer (Next.js)",
    company: "WeAre JobPilot",
    location: "Remote (EU)",
    remote: true,
    applyUrl: "https://wearejobpilot.com/apply/frontend",
    description: "Bouw mee aan snelle, schone RSC-interfaces.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "emp-002",
    title: "Node/TypeScript Engineer",
    company: "WeAre JobPilot",
    location: "Wrocław / Hybrid",
    remote: false,
    applyUrl: "https://wearejobpilot.com/apply/backend",
    description: "API’s met performance budget en Zod-validatie.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "emp-003",
    title: "Product Designer (UX/UI)",
    company: "WeAre JobPilot",
    location: "Remote (CET)",
    remote: true,
    applyUrl: "https://wearejobpilot.com/apply/design",
    description: "Design systeemcomponenten; a11y en CWV-focus.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  // Geen cache in Vercel; altijd verse JSON
  return NextResponse.json(jobs, {
    headers: { "Cache-Control": "no-store" },
  });
}
