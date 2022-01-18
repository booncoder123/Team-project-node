import mongoose from 'mongoose';
import Logger from '../loaders/logger.js';
import config from '../config/index.js';

async function connectMongo() {
  await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      Logger.info(` 🎈 Server connecting to database 🎈   `);
    })
    .catch(error => {
      Logger.error(error);
      process.exit(1);
    });
}
export default connectMongo;
