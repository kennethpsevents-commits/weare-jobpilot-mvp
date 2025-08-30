import { NextResponse } from "next/server";
// use relative paths to avoid alias issues on Vercel
import sources from "../../../../data/sources.json";
import { dedupe } from "../../../../lib/normalize";
import {
  getGreenhouse,
  getLever,
  getAshby,
  getWorkable,
  getTeamtailor,
} from "../../../../lib/connectors";

export const revalidate = 0;

export async function GET() {
  const all: any[] = [];

  const gh = (sources as any).greenhouse ?? [];
  const lv = (sources as any).lever ?? [];
  const ab = (sources as any).ashby ?? [];
  const wk = (sources as any).workable ?? [];
  const tt = (sources as any).teamtailor ?? [];

  const tasks: Promise<any[]>[] = [
    ...gh.map((b: string) => getGreenhouse(b)),
    ...lv.map((b: string) => getLever(b)),
    ...ab.map((b: string) => getAshby(b)),
    ...wk.map((b: string) => getWorkable(b)),
    ...tt.map((b: string) => getTeamtailor(b)),
  ];

  const settled = await Promise.allSettled(tasks);
  for (const s of settled) if (s.status === "fulfilled") all.push(...s.value);

  const unique = dedupe(all);
  unique.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  return NextResponse.json(unique.slice(0, 2000), { status: 200 });
}
