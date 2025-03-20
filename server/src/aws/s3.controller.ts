//Tạo Controller để cung cấp Endpoint lấy Pre-signed URL

import { Controller, Post, Body, Put } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Public } from '@/auth/decorators/customs.decorator';

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
}
