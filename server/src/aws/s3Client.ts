import AWS from 'aws-sdk'

// export const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_SECRET,
// })

// export const s3 = new AWS.S3({
// 	credentials: {
// 		accessKeyId: 'AKIA5V2B6GIEQC3AFR5B',
// 		secretAccessKey: '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' 
// 	},
// 	region: 'us-east-1',
// });

export const s3 = new AWS.S3({
  accessKeyId: "AKIA5V2B6GIEVHOX4XG4",
  params: { Bucket: 'k-app' }, 
  secretAccessKey: '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',
  region: 'us-east-1',
});