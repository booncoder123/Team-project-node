import dotenv from 'dotenv';
dotenv.config();


if (process.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}


export default {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  


};
