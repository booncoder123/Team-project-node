import express from 'express';
import config from './config/index.js';
import apiv1Routes from './routes/index.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import connectMongo from './loaders/mongoose.js';
import multer from 'multer';
import userRoute from './routes/user.routes.js';
async function startServer() {
  const app = express();
  await connectMongo();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/v1', apiv1Routes);
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

  app.use('/', (req, res, next) => {
    res.status(200).send('SE AUTHORIZATION SERVER');
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
      res.status(200).send(err);
      // process.exit(1);
    });
}
startServer();
