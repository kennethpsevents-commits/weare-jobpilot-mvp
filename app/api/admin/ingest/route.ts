import { NextResponse } from "next/server";
import src from "@/data/sources.json" assert { type: "json" };
import { dedupe } from "@/lib/normalize";
import { getGreenhouse, getLever, getAshby, getWorkable, getTeamtailor } from "@/lib/connectors";
// import { PrismaClient } from "@prisma/client"; // enable after prisma setup
// const prisma = new PrismaClient();

export const runtime = "nodejs";
export const revalidate = 0;

export async function POST() {
  const tasks: Promise<any[]>[] = [];
  for (const b of (src as any).greenhouse ?? []) tasks.push(getGreenhouse(b));
  for (const b of (src as any).lever ?? []) tasks.push(getLever(b));
  for (const b of (src as any).ashby ?? []) tasks.push(getAshby(b));
  for (const b of (src as any).workable ?? []) tasks.push(getWorkable(b));
  for (const b of (src as any).teamtailor ?? []) tasks.push(getTeamtailor(b));

  const settled = await Promise.allSettled(tasks);
  const all: any[] = [];
  for (const s of settled) if (s.status === "fulfilled") all.push(...s.value);

  const unique = dedupe(all);

  // After DB is ready, upsert here in batches
  // await prisma.$transaction(
  //   unique.map(j => prisma.job.upsert({
  //     where: { id: j.id },
  //     update: { ...j },
  //     create: { ...j, source: j.board ?? "unknown", createdAt: new Date(j.createdAt) }
  //   })),
  //   { timeout: 60000 }
  // );

  return NextResponse.json({ received: unique.length }, { status: 200 });
}
