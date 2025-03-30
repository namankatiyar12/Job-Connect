import admin from 'firebase-admin';
import serviceAccount from './jobconnect-e95b7-firebase-adminsdk-fbsvc-60e88ad184.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export default admin;
