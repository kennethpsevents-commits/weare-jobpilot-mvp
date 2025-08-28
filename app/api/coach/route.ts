import { NextResponse } from "next/server";
import { COACH_SYSTEM_PROMPT } from "@/lib/coachPrompt";

export const runtime = "nodejs"; // i.v.m. fetch naar externe API

type Msg = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  try {
    const { history } = (await req.json()) as { history: Msg[] };
    const messages: Msg[] = [
      { role: "system", content: COACH_SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history : []),
    ];

    // Verwacht: OPENAI_API_KEY in .env
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server mist OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    // Simpele, betrouwbare niet-streaming call
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
      const errTxt = await r.text();
      return NextResponse.json(
        { error: "AI call failed", detail: errTxt },
        { status: 502 }
      );
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Ik ben er. Wat heb je nodig?";

    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Onbekende fout" },
      { status: 400 }
    );
  }
}
