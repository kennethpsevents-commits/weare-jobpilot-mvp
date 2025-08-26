import JobCard from "@/components/JobCard";
import dummies from "@/data/dummies.json";

export default function VacaturesPage() {
  const jobs = Array.isArray(dummies) ? dummies : [];

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Vacatures</h1>

      {jobs.length === 0 ? (
        <p>Geen vacatures gevonden.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j: any) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </main>
  );
}
