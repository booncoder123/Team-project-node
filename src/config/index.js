import dotenv from 'dotenv';
dotenv.config();
if (process.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  aws: {
    acesskeyId: process.env.ACESS_KEY_ID,
    secretAcessKeyId: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
    bucketName: process.env.BUCKET_NAME,
  },
};
