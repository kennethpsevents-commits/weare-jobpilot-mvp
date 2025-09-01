// lib/firebaseAdmin.ts
// No-op fallback: voorkomt build errors op Vercel
export function getAdmin() {
  throw new Error(
    "Firebase Admin is disabled in this environment. Remove imports, or provide proper server-only initialization."
  );
}
