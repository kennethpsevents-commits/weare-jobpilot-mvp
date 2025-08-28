import { NextResponse } from "next/server";
import { COACH_SYSTEM_PROMPT } from "@/lib/coachPrompt";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { history } = (await req.json()) as { history: Msg[] };
    const messages: Msg[] = [
      { role: "system", content: COACH_SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history : []),
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Geen OPENAI_API_KEY op server" },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.5,
        max_tokens: 450,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return NextResponse.json(
        { error: "AI call failed", detail: err },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Ik ben er. Wat heb je nodig?";

    return NextResponse.json(
      { reply },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Onbekende fout" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
}
