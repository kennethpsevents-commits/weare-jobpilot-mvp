"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import type { Job } from "@/lib/jobs";

export default function NieuwToegevoegdGrid() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetch("/api/crawl/greenhouse?limit=9")
      .then(r => r.json())
      .then(d => Array.isArray(d) ? setJobs(d) : setJobs([]))
      .catch(() => setJobs([]));
  }, []);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map(j => <JobCard key={j.id} job={j} />)}
    </div>
  );
}
