import admin from "firebase-admin";
import * as serviceAccount from "../secrets/firebase_admin_key.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const firebaseAdmin = admin.auth();
