import { NextResponse } from "next/server";
import {
  getGreenhouse,
  getLever,
  getAshby,
  getWorkable,
  getTeamtailor,
  type MinimalJob,
} from "@/lib/connectors";
import sources from "@/data/sources.json";
import boards from "@/data/greenhouse.json";

type CheckResult = {
  ok: boolean;
  error?: string;
  count?: number;
  sample?: MinimalJob | null;
};

async function safe<T>(fn: () => Promise<T>): Promise<{ ok: true; value: T } | { ok: false; error: string }> {
  try {
    const value = await fn();
    return { ok: true as const, value };
  } catch (e: any) {
    return { ok: false as const, error: e?.message ?? String(e) };
  }
}

export async function GET() {
  // Kies 1 board per bron om te testen (zodat het snel blijft)
  const greenhouseBoard = (Array.isArray(boards) && boards[0]?.board) || "stripe";
  const leverBoard     = (sources.lever && sources.lever[0]) || "example";
  const ashbyBoard     = (sources.ashby && sources.ashby[0]) || "example";
  const workableSub    = (sources.workable && sources.workable[0]) || "example";
  const teamtailorSub  = (sources.teamtailor && sources.teamtailor[0]) || "example";

  const results: Record<string, CheckResult> = {};

  // Greenhouse
  {
    const r = await safe(() => getGreenhouse(greenhouseBoard));
    results.greenhouse = r.ok
      ? { ok: true, count: (r.value as MinimalJob[]).length, sample: (r.value as MinimalJob[])[0] ?? null }
      : { ok: false, error: r.error };
  }

  // Lever
  {
    const r = await safe(() => getLever(leverBoard));
    results.lever = r.ok
      ? { ok: true, count: (r.value as MinimalJob[]).length, sample: (r.value as MinimalJob[])[0] ?? null }
      : { ok: false, error: r.error };
  }

  // Ashby
  {
    const r = await safe(() => getAshby(ashbyBoard));
    results.ashby = r.ok
      ? { ok: true, count: (r.value as MinimalJob[]).length, sample: (r.value as MinimalJob[])[0] ?? null }
      : { ok: false, error: r.error };
  }

  // Workable
  {
    const r = await safe(() => getWorkable(workableSub));
    results.workable = r.ok
      ? { ok: true, count: (r.value as MinimalJob[]).length, sample: (r.value as MinimalJob[])[0] ?? null }
      : { ok: false, error: r.error };
  }

  // Teamtailor
  {
    const r = await safe(() => getTeamtailor(teamtailorSub));
    results.teamtailor = r.ok
      ? { ok: true, count: (r.value as MinimalJob[]).length, sample: (r.value as MinimalJob[])[0] ?? null }
      : { ok: false, error: r.error };
  }

  return NextResponse.json({
    status: "connector-smoke-test",
    usedBoards: { greenhouseBoard, leverBoard, ashbyBoard, workableSub, teamtailorSub },
    results,
  });
}
