import { NextResponse } from "next/server";
import { sanitizeJob, addJob } from "@/lib/jobs";
type RemotiveItem = { title?: string; company_name?: string; candidate_required_location?: string; url?: string; };
export async function GET(){
  try{
    const r=await fetch("https://remotive.com/api/remote-jobs?limit=20",{cache:"no-store"});
    if(!r.ok) return NextResponse.json({error:"remotive fetch failed"},{status:502});
    const data=await r.json(); const items:RemotiveItem[]=Array.isArray(data?.jobs)?data.jobs:[];
    let imported=0;
    for(const it of items){
      const res=sanitizeJob({
        title: it.title ?? "Unknown",
        company: it.company_name ?? "Unknown",
        location: it.candidate_required_location ?? "Remote",
        remote: true,
        applyUrl: it.url ?? "#",
      });
      if(!res.ok) continue;
      addJob(res.job); imported++;
    }
    return NextResponse.json({ok:true,source:"remotive",imported});
  }catch(e:any){return NextResponse.json({error:e?.message??"import error"},{status:500});}
}
