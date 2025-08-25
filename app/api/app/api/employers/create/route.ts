import { NextResponse } from "next/server";

type EmployerJob = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  description?: string;
  createdAt: string;
  source: "employer";
};

// tijdelijk geheugen (reset bij herstart, maar prima voor test)
const IN_MEMORY: EmployerJob[] = [];

function asBool(v: any) {
  const s = String(v ?? "").toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.title || !b.company || !b.applyUrl) {
      return NextResponse.json(
        { message: "title, company en applyUrl verplicht" },
        {
