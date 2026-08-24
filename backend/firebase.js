import dotenv from "dotenv";

dotenv.config();

let admin = null;
try {
  ({ default: admin } = await import("firebase-admin"));
} catch (error) {
  admin = null;
}

if (admin && !admin.apps.length && process.env.FIREBASE_PROJECT_ID) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}


export default admin;
