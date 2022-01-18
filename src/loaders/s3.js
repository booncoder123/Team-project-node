import path from 'path';
import fs from 'fs';
import aws from 'aws-sdk';
import config from '../config/index.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: config.aws.acesskeyId,
  secretAccessKey: config.aws.secretAcessKeyId,
  region: config.aws.region,
});

const s3 = new aws.S3();
//upload a file to s3
// async function uploadFile(file,userId)  {
//     const fileStream = fs.createReadStream(file.path)
//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: "userAvatar/" + userId,
//         ContentType:  "image/jpeg",
//         ACL: "public-read",
//     }

//     return s3.upload(uploadParams).promise()

// }

// async function uploadManyFile(images, userId, pathS3) {
//   const fileReturn = await Promise.all(
//     images.map(async item => {
//       const filePath = path.join(__dirname, '..', '..', 'uploads', item.filename);
//       const key = pathS3 + '/' + userId + '/' + item.filename + '.jpeg';

//       var params = {
//         Bucket: config.aws.bucketName,
//         Key: key,
//         Body: fs.createReadStream(filePath),
//         ContentType: 'image/jpeg',
//         // ACL: 'public-read',
//       };

//       const data = await s3
//         .upload(params)
//         .promise()
//         .then(data => {
//           fs.unlinkSync(filePath);

//           return data;
//         });

//       return data['Location'];
//     }),
//   );

//   return fileReturn;
// }

// export default uploadManyFile;
