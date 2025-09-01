"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    whatsapp: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Registratie opgeslagen (hier koppel je Firebase Auth + Firestore).");
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Account aanmaken</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" placeholder="Naam" onChange={handleChange} className="border p-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
        <input name="phone" placeholder="Telefoonnummer" onChange={handleChange} className="border p-2" />
        <input name="instagram" placeholder="Instagram" onChange={handleChange} className="border p-2" />
        <input name="tiktok" placeholder="TikTok" onChange={handleChange} className="border p-2" />
        <input name="linkedin" placeholder="LinkedIn" onChange={handleChange} className="border p-2" />
        <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} className="border p-2" />
        <input name="password" type="password" placeholder="Wachtwoord" onChange={handleChange} className="border p-2" />
        <button className="px-4 py-2 bg-black text-white rounded">Registreren</button>
      </form>
    </div>
  );
}
