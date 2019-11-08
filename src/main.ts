import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { env } from './env'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule);
  await app.listen(env.app.port);
  console.log(`App listing on port ${env.app.port}`)
}
bootstrap();
