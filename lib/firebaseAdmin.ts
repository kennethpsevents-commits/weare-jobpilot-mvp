// lib/firebaseAdmin.ts
// Build-safe fallback zodat Vercel niet breekt bij 'firebase-admin' imports

let admin: typeof import('firebase-admin') | null = null;

if (process.env.FIREBASE_PROJECT_ID) {
  // Alleen importeren in Node.js (server-side)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  admin = require('firebase-admin');
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
}

export function getAdmin() {
  if (!admin) {
    throw new Error('Firebase Admin not available in this environment');
  }
  return admin;
}

