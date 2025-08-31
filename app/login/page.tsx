'use client';
import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  async function logout() {
    await signOut(getAuth());
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
      {!user ? (
        <button onClick={loginGoogle} className="px-4 py-2 rounded bg-black text-white">
          Continue with Google
        </button>
      ) : (
        <div className="space-y-2">
          <div className="text-sm">Signed in as {user.email}</div>
          <a href="/admin/dashboard" className="underline">Go to Admin</a>
          <button onClick={logout} className="block px-4 py-2 rounded bg-gray-200">Logout</button>
        </div>
      )}
    </div>
  );
}
