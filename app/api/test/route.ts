import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("/api/jobs/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      jobs: [
        {
          extId: "abc-123",
          source: "greenhouse",
          title: "Backend Engineer",
          company: "ACME Corp",
          remote: true,
          applyUrl: "https://acme.com/jobs/123",
          createdAt: "2025-01-01T00:00:00.000Z"
        }
      ]
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
