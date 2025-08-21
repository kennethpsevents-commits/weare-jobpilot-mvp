export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(()=>null) as any;
  if (!body || !body.company || !body.email) {
    return new Response("Missing fields", { status: 400 });
  }
  // Optionally forward to Slack webhook if provided
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Employer Lead\nCompany: ${body.company}\nEmail: ${body.email}\nPlan: ${body.plan}\nMessage: ${body.message || ""}` })
      });
    } catch {}
  }
  console.log("[EmployerLead]", body);
  return new Response(null, { status: 202 });
}
