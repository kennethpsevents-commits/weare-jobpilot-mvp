import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form (e.g., to Supabase or API)
    alert('Form submitted! Name: ' + name + ', Email: ' + email);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Account Aanmaken</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Naam" 
          className="border p-2 w-full" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="border p-2 w-full" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Wachtwoord" 
          className="border p-2 w-full" 
          required 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Verzenden
        </button>
      </form>
    </div>
  );
}
