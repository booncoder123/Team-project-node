import mongoose from 'mongoose';

import config from '../config/index.js';

async function connectMongo() {
  await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
     console.log(` 🎈 Server connecting to database 🎈   `);
    })
    .catch(error => {
      console.log(error);
      process.exit(1);
    });
}
export default connectMongo;
