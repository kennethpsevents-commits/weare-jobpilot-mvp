"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Welkom bij JobPilot</h1>
      <p className="text-lg text-neutral-700">
        Het platform waar werkgevers en talent elkaar vinden.
      </p>

      <div className="mt-6 space-y-2">
        <p>
          <Link href="/vacatures" className="underline text-blue-600">
            Bekijk vacatures
          </Link>
        </p>
        <p>
          <Link href="/employer" className="underline text-blue-600">
            Vacature plaatsen (recruiter)
          </Link>
        </p>
      </div>
    </main>
  );
}
