import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { coachPrompt } from '@/lib/coachPrompt';
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
export async function POST(request: Request) {
  try {
    const { message, phoneNumber } = await request.json();
   
    // Get AI response
    const response = await coachPrompt(message);
   
    // Send via Twilio
    const client = twilio(accountSid, authToken);
    await client.messages.create({
      body: response,
      from: 'whatsapp:+14155238886', // Twilio sandbox
      to: `whatsapp:${phoneNumber}`
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Twilio Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
