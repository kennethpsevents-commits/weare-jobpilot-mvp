// lib/firebaseAdmin.ts
// No-op shim om builds groen te houden zolang Firebase Admin niet nodig is.
export const firebaseAdmin = {
  app: null as any,
  auth: () => { throw new Error("Firebase Admin not configured."); },
  firestore: () => { throw new Error("Firebase Admin not configured."); },
};
