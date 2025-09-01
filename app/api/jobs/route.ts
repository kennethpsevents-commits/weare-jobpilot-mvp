import { NextResponse } from "next/server";
import { getJobs, setJobs } from "../../../lib/store";
import { listGreenhouseMapped } from "../../../lib/connectors";

const DEFAULT_BOARDS = ["stripe"];

export async function GET() {
  let jobs = getJobs();
  if (!jobs || jobs.length === 0) {
    jobs = await listGreenhouseMapped(DEFAULT_BOARDS);
    setJobs(jobs);
  }
  return NextResponse.json({ jobs, count: jobs.length });
}
