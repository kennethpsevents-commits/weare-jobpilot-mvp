import type { Job } from "@/lib/jobs";
import ContactButton from "@/components/ContactButton";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-2xl border p-4 shadow-sm">
      <header className="mb-2">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-600">
          {job.company}
          {job.location ? ` · ${job.location}` : ""}
          {job.remote ? " · Remote" : ""}
        </p>
      </header>

      {job.description && (
        <p className="text-sm text-gray-700 line-clamp-3">
          {stripHtml(job.description).slice(0, 240)}
          {job.description.length > 240 ? "…" : ""}
        </p>
      )}

      {/* Contact / Apply knop met soft paywall */}
      <ContactButton applyUrl={job.applyUrl} />

      <footer className="mt-2 text-xs text-gray-400">
        Geplaatst: {new Date(job.createdAt).toLocaleDateString()}
      </footer>
    </article>
  );
}

/** Kleine helper om HTML te strippen als description HTML bevat */
function stripHtml(input?: string) {
  if (!input) return "";
  return input.replace(/<[^>]+>/g, " ");
}
