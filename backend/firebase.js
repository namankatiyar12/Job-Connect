import dotenv from "dotenv";

dotenv.config();

let admin = null;
try {
  ({ default: admin } = await import("firebase-admin"));
} catch (error) {
  admin = null;
}

const hasFirebaseCredentials = process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (admin && !admin.apps.length && hasFirebaseCredentials) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}


export default admin;
