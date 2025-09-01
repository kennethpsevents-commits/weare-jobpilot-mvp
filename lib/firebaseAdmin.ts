// lib/firebaseAdmin.ts
export function getAdmin() {
  throw new Error(
    'Firebase Admin is disabled in this environment. Remove imports, or provide proper server-only initialization.'
  );
}
