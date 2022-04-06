import { auth } from '../loaders/firebase.js';

async function authMiddleware(req, res, next) {
  try {
    console.log('eiei');
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      const error = new Error('Forbidden! User is not authenticated');
      error.statusCode = 403;
      throw error;
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    if (decodedToken) {
      const { uid, email } = decodedToken;
      req.uid = uid;
      req.email = email;

      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export default authMiddleware;
