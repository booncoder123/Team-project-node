import  admin  from "firebase-admin"
import serviceAccount from "../../key.json"


const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth(firebase);
export { firebase, auth };