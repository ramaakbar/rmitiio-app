import { Client } from "minio";

export const bucketName = process.env.BUCKET_NAME;

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT as string,
  accessKey: process.env.MINIO_ACCESSKEY as string,
  secretKey: process.env.MINIO_SECRETKEY as string,
});
