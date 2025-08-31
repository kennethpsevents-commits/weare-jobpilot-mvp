// lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;

if (!admin.apps.length) {
  if (!b64) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_B64 env');
  }
  const json = Buffer.from(b64, 'base64').toString('utf8');
  const creds = JSON.parse(json);

  admin.initializeApp({
    credential: admin.credential.cert(creds),
  });
}

export const adminDb = admin.firestore();
