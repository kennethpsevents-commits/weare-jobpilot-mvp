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

type Status = {
  ok: boolean;
  error?: string;
  count?: number;
  sample?: MinimalJob | null;
  tookMs?: number;
};

async function check<T>(fn: () => Promise<T>): Promise<{ ok: true; value: T; tookMs: number } | { ok: false; error: string; tookMs: number }> {
  const t0 = Date.now();
  try {
    const v = await fn();
    return { ok: true, value: v, tookMs: Date.now() - t0 };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? String(e), tookMs: Date.now() - t0 };
  }
}

export async function GET() {
  const greenhouseBoard = (Array.isArray(boards) && boards[0]?.board) || "stripe";
  const leverBoard     = (sources.lever && sources.lever[0]) || "example";
  const ashbyBoard     = (sources.ashby && sources.ashby[0]) || "example";
  const workableSub    = (sources.workable && sources.workable[0]) || "example";
  const teamtailorSub  = (sources.teamtailor && sources.teamtailor[0]) || "example";

  const r1 = await check(() => getGreenhouse(greenhouseBoard));
  const r2 = await check(() => getLever(leverBoard));
  const r3 = await check(() => getAshby(ashbyBoard));
  const r4 = await check(() => getWorkable(workableSub));
  const r5 = await check(() => getTeamtailor(teamtailorSub));

  const toStatus = (r: any): Status =>
    r.ok
      ? { ok: true, count: (r.value as MinimalJob[]).length, sample: (r.value as MinimalJob[])[0] ?? null, tookMs: r.tookMs }
      : { ok: false, error: r.error, tookMs: r.tookMs };

  return NextResponse.json({
    time: new Date().toISOString(),
    used: { greenhouseBoard, leverBoard, ashbyBoard, workableSub, teamtailorSub },
    connectors: {
      greenhouse: toStatus(r1),
      lever: toStatus(r2),
      ashby: toStatus(r3),
      workable: toStatus(r4),
      teamtailor: toStatus(r5),
    },
  });
}
