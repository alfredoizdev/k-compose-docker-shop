import stream from 'stream';
import { s3 } from '../aws/s3Client';

export const createUploadStream = (key: any) => {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: s3
      .upload({
        Bucket: 'k-app',
        Key: key,
        Body: pass,
      })
      .promise(),
  };
};
