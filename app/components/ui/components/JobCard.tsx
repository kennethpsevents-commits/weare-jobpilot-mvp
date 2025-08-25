"use client";
import Link from "next/link";
import type { Job } from "@/lib/jobs";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-2xl border p-4 hover:shadow-md transition">
      <header className="mb-2">
        <h3 className="font-semibold text-lg leading-snug">{job.title}</h3>
        <p className="text-sm opacity-80">{job.company}</p>
      </header>
      <p className="text-sm opacity-80">
        {job.location || "Location not specified"}
      </p>
      <div className="mt-3 flex items-center gap-3 text-xs opacity-70">
        <span>{job.remote ? "Remote/Hybrid" : "On-site"}</span>
        <span>•</span>
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <a
          className="text-sm underline"
          href={job.url}
          target="_blank"
          rel="noreferrer"
        >
          Bekijk bij werkgever
        </a>
        <Link
          className="text-sm underline"
          href={`/vacatures/${encodeURIComponent(job.id)}`}
        >
          Details
        </Link>
      </div>
    </article>
  );
}
