import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const config = app.get(ConfigService);
  app.useLogger(app.get(Logger));
  await app.listen(config.get('PORT'));
}
bootstrap();
