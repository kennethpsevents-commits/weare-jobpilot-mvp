"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Job = {
  id: string;
  title: string;
  company: string;
  type: "Remote"|"Hybrid"|"On-site";
  branch: string;
  location: string;
  language: "nl"|"en";
  url?: string;
  createdAt: string;
};

const translations = {
  nl: {
    search: "Zoek vacatures, bedrijven of mensen...",
    vacatures: "Vacatures",
    netwerk: "Netwerk",
    aanmelden: "Aanmelden",
    vind: "Vind jouw droombaan",
    gemak: "met gemak",
    sub: "Sluit je aan bij duizenden jonge professionals en ontdek de beste kansen in jouw vakgebied.",
    begin: "Begin vandaag",
    ai: "AI Career Match",
    nieuw: "Nieuw toegevoegde vacatures",
    solliciteer: "Solliciteer",
    rights: "Alle rechten voorbehouden."
  },
  en: {
    search: "Search jobs, companies or people...",
    vacatures: "Jobs",
    netwerk: "Network",
    aanmelden: "Sign up",
    vind: "Find your dream job",
    gemak: "with ease",
    sub: "Join thousands of young professionals and discover the best opportunities in your field.",
    begin: "Get started today",
    ai: "AI Career Match",
    nieuw: "Recently added jobs",
    solliciteer: "Apply",
    rights: "All rights reserved."
  }
};

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<"all"|"Remote"|"Hybrid"|"On-site">("all");
  const [language, setLanguage] = useState<"nl"|"en">("nl");
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`/api/jobs?lang=${language}`, { signal: ctrl.signal })
      .then(r => r.json())
      .then(d => setJobs(d.items))
      .catch(()=>{});
    return () => ctrl.abort();
  }, [language]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs
      .filter(j => (activeFilter === "all" || j.type === activeFilter))
      .filter(j => !q || `${j.title} ${j.company} ${j.branch} ${j.location}`.toLowerCase().includes(q));
  }, [jobs, activeFilter, query]);

  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="WeAreJobPilot" className="h-8 w-8" />
            <span className="text-lg font-bold text-brand flex items-center space-x-1">
              <span>WeAre</span><span className="text-black">_JobPilot</span>
            </span>
          </div>
          <div className="flex-1 max-w-lg mx-6">
            <Input type="text" placeholder={t.search} value={query} onChange={e=>setQuery(e.target.value)} />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm font-medium">{t.vacatures}</Button>
            <Button className="bg-brand hover:bg-brand-dark text-white rounded-md px-4 py-2 text-sm font-semibold">
              {t.aanmelden}
            </Button>
            <select value={language} onChange={(e)=>setLanguage(e.target.value as any)} className="border rounded px-2 py-1 text-sm">
              <option value="nl">NL</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </header>

      <section className="pt-14 pb-12 bg-gradient-to-r from-[#E0F2FE] via-white to-[#F9FAFB]">
        <div className="container flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-5">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t.vind} <span className="text-brand">{t.gemak}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">{t.sub}</p>
            <div className="flex space-x-4">
              <a href="/#jobs" className="btn btn-primary">{t.begin}</a>
              <a href="/ai" className="btn btn-outline">{t.ai}</a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Blije jongeren samenwerken"
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-b border-gray-200 py-5">
        <div className="container flex flex-wrap items-center gap-4">
          {["all","Remote","Hybrid","On-site"].map(f => (
            <Button key={f} variant={activeFilter === f ? "primary":"outline"} onClick={()=>setActiveFilter(f as any)}>
              {f === "all" ? "Alle" : f}
            </Button>
          ))}
        </div>
      </section>

      <section id="jobs" className="py-16">
        <div className="container space-y-8">
          <h2 className="text-2xl font-bold">{t.nieuw}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shown.map((job) => (
              <Card key={job.id} className="rounded-xl border border-gray-200">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://randomuser.me/api/portraits/men/${parseInt(job.id,10)%80}.jpg`} alt={job.company} />
                    </Avatar>
                    <div>
                      <p className="font-semibold text-base">{job.title}</p>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{job.branch} · {job.location} · {job.type}</p>
                  {job.url ? (
                    <a className="btn btn-primary w-full text-center" href={job.url} target="_blank" rel="noreferrer">{t.solliciteer}</a>
                  ) : (
                    <a className="btn btn-primary w-full text-center" href={`mailto:jobs@wearejobpilot.com?subject=Apply: ${encodeURIComponent(job.title)}`}>{t.solliciteer}</a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
