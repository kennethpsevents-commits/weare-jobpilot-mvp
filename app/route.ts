// Dummy crawler (later vervangen door echte scraper)
export async function GET() {
  const now = new Date().toISOString();

  const newJobs: Job[] = [
    {
      id: String(Date.now()),
      title: "Junior Fullstack Developer",
      company: "JobPilot Labs",
      type: "Remote",
      branch: "IT",
      location: "Netherlands",
      language: "en",
      url: "https://example.com/apply/dev",
      createdAt: now
    },
    {
      id: String(Date.now() + 1),
      title: "Marketing Trainee",
      company: "JobPilot Labs",
      type: "On-site",
      branch: "Marketing",
      location: "Poland",
      language: "en",
      url: "https://example.com/apply/marketing",
      createdAt: now
    }
  ];

  // TODO: schrijf naar Supabase of update JSON-bestanden
  console.log("Crawled jobs", newJobs);

  return Response.json({ ok: true, added: newJobs.length });
}
