import express from 'express';
import config from './config/index.js';
import apiv1Routes from './routes/index.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import connectMongo from './loaders/mongoose.js';
import multer from 'multer';
import userRoute from './routes/user.routes.js';
import cors from 'cors';

export async function startServer() {
  const app = express();
  app.use(cors());
  await connectMongo();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/v1', apiv1Routes);
  app.use(ErrorHandler);

  app.use('/', (req, res, next) => {
    res.status(200).send('Im here pls');
  });

  app
    .listen(config.port, () => {
      console.log(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
          ################################################
        `);
    })
    .on('error', err => {
      console.log('error help');
      console.log(err);
      res.status(200).send(err);
      // process.exit(1);
    });
  return app;
}
// startServer();
const app = await startServer();
export default app;
