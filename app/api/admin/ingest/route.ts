import { NextResponse } from "next/server";
// relative paths to avoid '@/*' alias issues on Vercel
import sources from "../../../../../data/sources.json";
import { dedupe } from "../../../../../lib/normalize";
import {
  getGreenhouse,
  getLever,
  getAshby,
  getWorkable,
  getTeamtailor,
} from "../../../../../lib/connectors";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export const runtime = "nodejs";
export const revalidate = 0;

export async function POST() {
  const tasks: Promise<any[]>[] = [];
  for (const b of (sources as any).greenhouse ?? []) tasks.push(getGreenhouse(b));
  for (const b of (sources as any).lever ?? []) tasks.push(getLever(b));
  for (const b of (sources as any).ashby ?? []) tasks.push(getAshby(b));
  for (const b of (sources as any).workable ?? []) tasks.push(getWorkable(b));
  for (const b of (sources as any).teamtailor ?? []) tasks.push(getTeamtailor(b));

  const settled = await Promise.allSettled(tasks);
  const all: any[] = [];
  for (const s of settled) if (s.status === "fulfilled") all.push(...s.value);

  const unique = dedupe(all);

  // When DB is ready, upsert here:
  // await prisma.$transaction(
  //   unique.map(j => prisma.job.upsert({
  //     where: { id: j.id },
  //     update: { ...j },
  //     create: { ...j, source: j.board ?? "unknown", createdAt: new Date(j.createdAt) }
  //   }))
  // );

  return NextResponse.json({ received: unique.length }, { status: 200 });
}
