import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">WeAreJobPilot</h1>
      <p className="mb-6 text-lg">
        Uw AI-Aangedreven Baanreis Begint Hier.
      </p>

      <div className="flex gap-4">
        <Link
          href="/vacatures"
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
        >
          Bekijk vacatures
        </Link>

        <Link
          href="/ai"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          Probeer AI assistent
        </Link>
      </div>
    </div>
  );
}
