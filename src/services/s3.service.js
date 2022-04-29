import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import aws from '../loaders/s3.js';
import config from '../config/index.js';

// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

let s3 = new aws.S3();
// const fsPromises = fs.promises;

async function uploadFiles(images, userId, pathS3) {
  try {
    let fileReturn = await Promise.all(
      images.map(async item => {
        let dir = path.resolve();
        console.log('Dir!', dir);

        let filePath = path.join(dir, 'temp', item.filename);
        let key = `${pathS3}/${userId}/${item.filename}${uuidv4()}.jpeg`;
        let params = {
          Bucket: config.aws.bucketName,
          Key: key,
          Body: fs.createReadStream(filePath),
          ContentType: 'image/jpeg',
          // ACL: 'public-read',
        };

        let data = await s3
          .upload(params)
          .promise()
          .then(async tempData => {
            await fs.unlinkSync(filePath);
            return tempData;
          });
        return data.key;
      }),
    );

    return fileReturn;
  } catch (error) {
    console.log('Error occured while trying to upload to S3 bucket', error);
    throw error;
  }
}

let deleteFiles = async Key => {
  let keyArray = Key;
  if (!Array.isArray(Key)) {
    keyArray = Array.from(keyArray);
  }
  try {
    await Promise.all(
      keyArray.map(async item => {
        let params = {
          Bucket: config.aws.bucketName,
          Key: item,
        };

        await s3.deleteObject(params).promise();
      }),
    );
    return true;
  } catch (error) {
    console.log('Error occured while trying to delete to S3 bucket', error);
    throw error;
  }
};

export default { uploadFiles, deleteFiles };
