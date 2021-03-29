import './imports/index';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function logServerStarting(): void {
  console.log(`http://${process.env.BASE_URL}:${process.env.PORT}`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT, () => {
    process.env.ENVIRONMENT === 'development' && logServerStarting();
  });
}
bootstrap();
