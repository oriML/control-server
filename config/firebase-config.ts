import admin, { ServiceAccount } from "firebase-admin";

import serviceAccount from "./serviceAccountGenerator";

const json: ServiceAccount = serviceAccount();
json.privateKey = json.privateKey?.replace(/\\n/g, '\n');
admin.initializeApp({
  credential: admin.credential.cert(json)
});

export default admin;