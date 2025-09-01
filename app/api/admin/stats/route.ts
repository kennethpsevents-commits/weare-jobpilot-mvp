// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebaseAdmin";

export const runtime = 'nodejs'; // Use Node.js runtime for compatibility

export async function GET() {
  try {
    const db = firebaseAdmin.firestore();
    // Add your stats logic here
    return NextResponse.json({ message: "Stats retrieved" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
