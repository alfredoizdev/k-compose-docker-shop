import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  apiVersion: "2010-12-01",
  accessKeyId: "AKIA5V2B6GIEQZ4WINOT",
  params: { Bucket: 'k-app' }, 
  secretAccessKey: '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',
  region: 'us-east-1',
});