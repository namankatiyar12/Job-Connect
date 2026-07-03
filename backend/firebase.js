import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "./jobconnect-5b855-firebase-adminsdk-fbsvc-1aaabd9efd.json" with { type: "json" };

const app = initializeApp({
  credential: cert(serviceAccount),
});

export default app;