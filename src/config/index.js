import dotenv from 'dotenv';
dotenv.config();

if (process.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  aws: {
    acesskeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAcessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
};
