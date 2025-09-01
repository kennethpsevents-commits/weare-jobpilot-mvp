import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = [
    {
      id: "demo-1",
      title: "Frontend Developer",
      company: "Demo Corp",
      location: "Remote",
      url: "https://example.com/jobs/frontend"
    },
    {
      id: "demo-2",
      title: "Backend Engineer",
      company: "Sample Inc",
      location: "Amsterdam, NL",
      url: "https://example.com/jobs/backend"
    }
  ];

  return NextResponse.json({ jobs });
}
