// import {auth} from "../loaders/firebase.js"

async function authMiddleware(req, res, next) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        const error = new Error('Forbidden! User is not authenticated');
        error.statusCode = 403;
        throw error;
      }
      const token = authHeader.split(' ')[1];
      const decodedToken = await auth.verifyIdToken(token);
      if (decodedToken) {
        const { uid } = decodedToken;
        req.uid = uid;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
  
export default authMiddleware;
  