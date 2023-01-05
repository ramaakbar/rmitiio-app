import { S3Client } from "@aws-sdk/client-s3";

export const bucketName = process.env.BUCKET_NAME;
export const bucketRegion = process.env.BUCKET_REGION;
export const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
export const bucketSecretKey = process.env.BUCKET_SECRET_KEY;

export const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey ?? "",
    secretAccessKey: bucketSecretKey ?? "",
  },
  region: bucketRegion,
});
