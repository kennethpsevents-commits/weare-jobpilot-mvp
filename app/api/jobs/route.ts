import { NextResponse } from "next/server";
import { addJob, listJobs, sanitizeJob } from "@/lib/jobs";
export const runtime = "nodejs";
export async function GET(){ return NextResponse.json(listJobs(),{status:200}); }
export async function POST(req:Request){
  try{ const p=await req.json(); const s=sanitizeJob(p); if(!s.ok) return NextResponse.json({error:s.error},{status:400});
    addJob(s.job); return NextResponse.json({ok:true,job:s.job},{status:201});
  }catch(e:any){ return NextResponse.json({error:e?.message??"bad request"},{status:400});}
}
