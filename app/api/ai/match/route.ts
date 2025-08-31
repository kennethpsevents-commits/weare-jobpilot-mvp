import { NextResponse } from "next/server";

type Payload = {
  role?: string;
  skills?: string[];
  location?: string;
  seniority?: string;
};

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Payload;

  const role = (body.role ?? "").toString().slice(0, 80);
  const skills = Array.isArray(body.skills)
    ? body.skills.map(String).slice(0, 20)
    : [];
  const location = (body.location ?? "").toString().slice(0, 60);
  const seniority = (body.seniority ?? "").toString().slice(0, 40);

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (apiKey) {
    try {
      const prompt = [
        `You are a job-matching assistant. Return a short JSON with keys: "summary", "top_roles" (up to 5), "skills_to_add" (up to 5).`,
        `Candidate target role: ${role || "N/A"}`,
        `Skills: ${skills.join(", ") || "N/A"}`,
        `Location: ${location || "N/A"}`,
        `Seniority: ${seniority || "N/A"}`,
        `Keep it compact and practical. No prose outside JSON.`,
      ].join("\n");

      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        return NextResponse.json(
          { error: "AI request failed", detail: text },
          { status: 502 }
        );
      }
      const data = await resp.json();

      const content: string =
        data?.choices?.[0]?.message?.content ?? '{"summary":"No output"}';
      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch {
        parsed = { summary: content };
      }

      return NextResponse.json({
        mode: "ai",
        input: { role, skills, location, seniority },
        result: parsed,
      });
    } catch (e: any) {
      return NextResponse.json(
        { error: "AI exception", detail: e?.message ?? String(e) },
        { status: 500 }
      );
    }
  }

  const mock = {
    summary: `Match voor ${role || "onbekend"} (${seniority || "level n.v.t."}) — ${location || "locatie n.v.t."}`,
    top_roles: [
      role || "Product Designer",
      "Frontend Engineer",
      "Solutions Consultant",
    ],
    skills_to_add: skills.length ? ["System Design", "SQL"] : ["TypeScript", "Git", "SQL"],
  };

  return NextResponse.json({
    mode: "mock",
    input: { role, skills, location, seniority },
    result: mock,
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, expects: "POST JSON { role, skills[], location, seniority }" });
}
