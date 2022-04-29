import admin from 'firebase-admin';
import { initializeApp, applicationDefault, getApps, getApp, cert } from 'firebase-admin/app';
import config from '../config/index.js';
import { getAuth } from 'firebase-admin/auth';
// const firebase = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
const firebase = initializeApp({
  credential: cert({
    type: config.firebase.type,
    project_id: config.firebase.projectId,
    private_key_id: config.firebase.privateKeyId,
    private_key: process.env.FIREBASE_PRIVATE_KEY
      ? Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString().replace(/\\n/g, '\n')
      : undefined,
    client_email: config.firebase.clientEmail,
    client_id: config.firebase.clientId,
    auth_uri: config.firebase.authUri,
    token_uri: config.firebase.tokenUri,
    auth_provider_x509_cert_url: config.firebase.authProvider,
    client_x509_cert_url: config.firebase.clientUrl,
  }),
});

const auth = getAuth(firebase);
export { firebase, auth };
