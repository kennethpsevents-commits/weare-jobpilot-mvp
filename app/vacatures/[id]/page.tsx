"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Job } from "@/lib/jobs";

export default function VacatureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch("/api/crawl/greenhouse?limit=200")
      .then(r => r.json())
      .then((d: Job[]) => {
        const found = d.find(j => j.id === id);
        setJob(found || null);
      });
  }, [id]);

  if (!job) return <p className="p-6">Vacature niet gevonden…</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="mb-1">{job.company}</p>
      <p className="mb-4">{job.location}</p>
      <div className="text-sm opacity-70 mb-6">
        {job.remote ? "Remote/Hybrid" : "On-site"} •{" "}
        {new Date(job.createdAt).toLocaleDateString()}
      </div>
      <a href={job.url} target="_blank" rel="noreferrer"
         className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
        Solliciteer bij werkgever
      </a>
    </main>
  );
}
