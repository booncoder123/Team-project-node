import ErrorService from '../services/Error.js';
function ErrorHandler(err, req, res, next) {
  // in prod, don't use console.log or console.err because
  // it is not async
  // console.error(err);

  if (err instanceof Error) {
    res.status(err.statusCode).json(err.message);
    return;
  }
  res.status(500).json('something went wrong');
}

export default ErrorHandler;
