import jobs from "@/data/jobs.json";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function JobDetail({ params }: { params: { slug: string } }) {
  const job = (jobs as any[]).find(j => j.slug === params.slug);
  if (!job) return <main className="container py-10">Vacature niet gevonden.</main>;
  return (
    <main className="container py-10 space-y-4">
      <Link href="/vacatures" className="text-sm underline">← Terug naar vacatures</Link>
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <div className="text-gray-600">{job.company} • {job.location} • {job.type}</div>
      <p className="whitespace-pre-wrap">{job.description}</p>
      <a href={job.applyUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Solliciteer</a>
    </main>
  );
}
