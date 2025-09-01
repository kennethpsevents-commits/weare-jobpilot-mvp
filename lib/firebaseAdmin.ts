// lib/firebaseAdmin.ts
// No-op fallback: geen hard dependency op 'firebase-admin' tijdens build.
export function getAdmin() {
  throw new Error(
    'Firebase Admin is disabled in this environment. Remove imports, or provide proper server-only initialization.'
  );
}
