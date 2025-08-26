"use client";
import type { Job } from "@/lib/jobs";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-2xl border p-4 hover:shadow-md transition">
      <header className="mb-2">
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <p className="text-sm opacity-80">{job.company}</p>
      </header>

      <p className="text-sm opacity-80">
        {job.location || "Location not specified"}
        {job.remote ? " • Remote" : ""}
      </p>

      <div className="mt-3 text-xs opacity-70">
        <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}</span>
      </div>

      <div className="mt-4">
        <a
          className="text-sm underline"
          href={job.applyUrl}        // 👈 dit was job.url
          target="_blank"
          rel="noreferrer"
        >
          Bekĳk bij werkgever
        </a>
      </div>
    </article>
  );
}
