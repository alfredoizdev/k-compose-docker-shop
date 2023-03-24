import AWS from 'aws-sdk'

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  params: { Bucket: process.env.BUCKET_NAME }, 
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1',
});