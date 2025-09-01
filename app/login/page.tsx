"use client";

import { useState } from "react";
import { auth, provider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Ingelogd");
  }
  async function handleGoogle() {
    await signInWithPopup(auth, provider);
    alert("Google login ok");
  }
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="w-full border p-2 mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full border p-2 mb-4" placeholder="Wachtwoord" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button className="px-4 py-2 border rounded" onClick={handleLogin}>Login</button>
        <button className="px-4 py-2 border rounded" onClick={handleGoogle}>Login met Google</button>
      </div>
    </div>
  );
}
