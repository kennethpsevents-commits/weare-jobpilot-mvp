export const firebaseAdmin = {
  app: null as any,
  auth: () => { throw new Error("Firebase Admin not configured."); },
  firestore: () => { throw new Error("Firebase Admin not configured."); },
};
