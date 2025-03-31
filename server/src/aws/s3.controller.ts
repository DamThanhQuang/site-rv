//Tạo Controller để cung cấp Endpoint lấy Pre-signed URL

import {
  Controller,
  Post,
  Body,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { Public } from '@/auth/decorators/customs.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('presigned-url')
  @Public()
  async getPresignedUrl(
    @Body() body: { filename: string; contentType: string },
  ): Promise<{ url: string; key: string }> {
    // Tạo key, thêm timestamp để tránh trùng lặp
    const key = `${Date.now()}- ${body.filename}`;
    const url = await this.s3Service.generatePresignedUrl(
      key,
      body.contentType,
    );
    return {
      url,
      key,
    };
  }

  @Post('create-product-photo/s3')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFileToS3(@UploadedFiles() files: Express.Multer.File[]) {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });

    const uploadPromises = files.map(async (file) => {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`; // Tạo tên file duy nhất

      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `uploads/${fileName}`, // Đường dẫn trong S3
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      await s3Client.send(new PutObjectCommand(params));
      return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/uploads/${fileName}`; // URL của ảnh đã upload
    });

    const urls = await Promise.all(uploadPromises);
    return {
      urls,
    };
  }
}
