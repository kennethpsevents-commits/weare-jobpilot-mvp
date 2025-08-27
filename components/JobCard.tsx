"use client";
import Link from "next/link";

type Job = {
  slug: string;
  title: string;
  company: string;
  location?: string;
  type?: "Remote" | "Hybrid" | "On-site";
  applyUrl: string;
  createdAt: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col gap-2">
      <div className="text-sm text-gray-500">{job.company} • {job.type ?? "—"}</div>
      <Link href={`/jobs/${job.slug}`} className="text-lg font-semibold hover:underline">
        {job.title}
      </Link>
      <div className="text-sm text-gray-600">{job.location ?? "—"}</div>
      <div className="mt-3 flex gap-2">
        <Link href={`/jobs/${job.slug}`} className="btn btn-outline text-sm px-3 py-1">Details</Link>
        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="btn btn-primary text-sm px-3 py-1">Solliciteer</a>
      </div>
    </div>
  );
}
