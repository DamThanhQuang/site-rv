import { Injectable, Post } from '@nestjs/common';
import * as AWS from 'aws-sdk';

// Tạo Service trong NestJS để tạo Pre-signed URL

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.bucketName = process.env.S3_BUCKET || '';
  }
  async generatePresignedUrl(
    key: string,
    contentType: string,
  ): Promise<string> {
    const parmas = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 1000,
      ContentType: contentType,
    };
    return await this.s3.getSignedUrlPromise('putObject', parmas);
  }
}
