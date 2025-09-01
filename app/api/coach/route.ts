import { NextResponse } from "next/server";
import { coachPrompt } from "../../../lib/coachPrompt";

export async function POST(req: Request) {
  const body = await req.json();
  const { message, phone } = body; // Neem aan dat input message en optioneel phone bevat
  const response = `AI Coach: ${coachPrompt}. Your message: ${message || "No message"}. Contact at ${phone || "no number"}. How can I assist?`;
  // Later: Voeg Twilio toe voor real WhatsApp/telefoon
  return NextResponse.json({ reply: response });
}
