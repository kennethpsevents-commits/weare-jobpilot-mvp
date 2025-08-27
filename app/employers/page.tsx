"use client";
import { useState } from "react";

type Form = {
  company: string;
  contactName: string;
  email: string;
  jobTitle: string;
  location: string;
  type: "Remote" | "Hybrid" | "On-site" | "";
  description: string;
  website?: string; // honeypot
};

export default function EmployersPage() {
  const [form, setForm] = useState<Form>({
    company: "",
    contactName: "",
    email: "",
    jobTitle: "",
    location: "",
    type: "",
    description: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const r = await fetch("/api/employers/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
        cache: "no-store",
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d?.ok) {
        setStatus({ ok: true, msg: "Ontvangen! We nemen snel contact op." });
        setForm({ company: "", contactName: "", email: "", jobTitle: "", location: "", type: "", description: "", website: "" });
      } else {
        setStatus({ ok: false, msg: "Controleer je invoer (bedrijf, e-mail, functietitel)." });
      }
    } catch {
      setStatus({ ok: false, msg: "Er ging iets mis. Probeer opnieuw." });
    }
    setLoading(false);
  }

  const on = (k: keyof Form) => (e: any) => setForm({ ...form, [k]: e.target.value });

  return (
    <main className="container py-10 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Plaats een vacature</h1>
      <p className="text-gray-600">Laat je gegevens achter. We valideren en nemen contact op voordat we publiceren.</p>

      <form onSubmit={submit} className="grid gap-3">
        <input className="border rounded px-3 py-2" placeholder="Bedrijfsnaam *" value={form.company} onChange={on("company")} required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Contac
