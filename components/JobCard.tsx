"use client";

type Job = {
  id: string; title: string; company: string;
  location?: string; remote?: boolean;
  applyUrl: string; createdAt: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <a href={job.applyUrl} className="block border rounded-lg p-4 hover:shadow">
      <h2 className="font-semibold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm">
        {job.location || "Onbekend"} {job.remote ? "· Remote" : ""}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Geplaatst: {new Date(job.createdAt).toLocaleDateString()}
      </p>
    </a>
  );
}
