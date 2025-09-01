// lib/firebaseAdmin.ts
// Build-safe fallback zodat Vercel niet 'firebase-admin' hoeft te bundelen.
export function getAdmin() {
  throw new Error(
    'Firebase Admin is disabled in this environment. Remove imports, or provide proper server-only initialization.'
  );
}
