import { NextResponse } from "next/server";
import jobs from "@/data/jobs.json";

export const dynamic = "force-dynamic";  // MVP: nooit stalen responses
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = search
