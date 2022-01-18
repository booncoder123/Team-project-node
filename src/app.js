import express from 'express';
import config from './config/index.js';
import Logger from './loaders/logger.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import connectMongo from './loaders/mongoose.js';
import multer from 'multer';

async function startServer() {
  const app = express();
  await connectMongo();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(ErrorHandler);

  // app.post(
  //   '/images/:userId',
  //   multer({
  //     dest: 'uploads/',
  //   }).array('images', 10),
  //   async (req, res) => {
  //     const images = req.files;
  //     const result = await uploadManyFile(images, '123', 'test');
  //     res.send(result);
  //   },
  // );

  app
    .listen(config.port, () => {
      Logger.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
          ################################################
        `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}
startServer();
