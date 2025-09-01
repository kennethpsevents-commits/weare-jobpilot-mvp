// lib/firebaseAdmin.ts
import 'server-only';

let _admin: typeof import('firebase-admin') | null = null;

export async function getAdmin() {
  if (_admin) return _admin;

  const admin = await import('firebase-admin');

  // Initialize once
  if (admin.getApps().length === 0) {
    admin.initializeApp({
      // Optionally pass credentials here if not using default env
      // credential: admin.credential.applicationDefault(),
    });
  }
  _admin = admin;
  return _admin;
}
