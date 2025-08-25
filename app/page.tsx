"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  createdAt: string;
  source: string;
};

export default function AICareerMatchPage() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [seniority, setSeniority] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Job[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location, seniority }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Kon geen matches ophalen");
      setResults(data.results || []);
    } catch (err: any) {
      setError(err?.message || "Er ging iets mis");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font
