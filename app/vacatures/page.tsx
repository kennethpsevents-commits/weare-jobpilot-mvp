import JobCard from "../../components/JobCard";

export default function VacaturesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Vacatures</h1>
      <JobCard
        job={{
          id: "demo-2",
          title: "Backend Developer",
          company: "WeAre JobPilot",
          location: "Amsterdam",
          remote: false,
          applyUrl: "https://wearejobpilot.com/apply",
          createdAt: new Date().toISOString(),
        }}
      />
    </main>
  );
}

