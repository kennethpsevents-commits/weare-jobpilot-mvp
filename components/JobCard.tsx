"use client";
import * as React from "react";
import type { Job } from "../lib/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <a
      href={job.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl p-4 shadow hover:shadow-lg transition border border-gray-200"
    >
      <div className="text-lg font-semibold">{job.title}</div>
      <div className="text-sm text-gray-600">
        {job.company} • {job.location}
      </div>
      <div className="mt-2 text-xs text-gray-500">Source: {job.source}</div>
    </a>
  );
}
