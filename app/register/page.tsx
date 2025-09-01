"use client";
import { useState } from "react";
export default function RegisterPage(){
  const [f,setF]=useState({name:"",email:"",phone:"",instagram:"",tiktok:"",linkedin:"",whatsapp:"",password:""});
  function onC(e:React.ChangeEvent<HTMLInputElement>){setF({...f,[e.target.name]:e.target.value});}
  function onS(e:React.FormEvent){e.preventDefault(); alert("Registratie opgeslagen (koppel hier Auth + Firestore/Supabase).");}
  return(<div className="max-w-lg mx-auto p-6"><h1 className="text-2xl font-bold mb-4">Account aanmaken</h1>
  <form onSubmit={onS} className="grid gap-3">
    <input name="name" placeholder="Naam" onChange={onC} className="border p-2"/>
    <input name="email" placeholder="Email" onChange={onC} className="border p-2"/>
    <input name="phone" placeholder="Telefoon" onChange={onC} className="border p-2"/>
    <input name="instagram" placeholder="Instagram" onChange={onC} className="border p-2"/>
    <input name="tiktok" placeholder="TikTok" onChange={onC} className="border p-2"/>
    <input name="linkedin" placeholder="LinkedIn" onChange={onC} className="border p-2"/>
    <input name="whatsapp" placeholder="WhatsApp" onChange={onC} className="border p-2"/>
    <input name="password" type="password" placeholder="Wachtwoord" onChange={onC} className="border p-2"/>
    <button className="px-4 py-2 bg-black text-white rounded">Registreren</button>
  </form></div>);
}
