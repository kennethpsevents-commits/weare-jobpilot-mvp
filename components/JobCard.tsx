"use client";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  description?: string;
  createdAt: string;
};

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-neutral-600">{job.company}</p>
        </div>
        <span className="text-xs rounded-full border px-2 py-0.5">
          {job.remote ? "Remote" : "On-site"}
        </span>
      </header>
      {job.location && (
        <p className="mt-1 text-sm text-neutral-700">{job.location}</p>
      )}
      {job.description && (
        <p className="mt-3 text-sm text-neutral-800 line-clamp-3">
          {job.description}
        </p>
      )}
      <footer className="mt-4">
        <a
          className="inline-block rounded-xl border px-3 py-1 text-sm hover:bg-neutral-50"
          href={job.applyUrl}
        >
          Apply
        </a>
      </footer>
    </article>
  );
}
export default JobCard;
