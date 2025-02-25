import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 8000; // Đặt mặc định 8000 nếu PORT chưa được set
  console.log(`Server is running on port ${port}`);

  app.setGlobalPrefix('/api/v1');

  // 🔥 Cấu hình CORS chính xác
  app.enableCors({
    origin: "http://localhost:3000", // Chỉ cho phép frontend truy cập
    credentials: true, // Cho phép gửi cookie/token
    allowedHeaders: ['Content-Type', 'Authorization'], // Header được phép gửi
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Các phương thức được phép
  });

  await app.listen(port);
}
bootstrap();
