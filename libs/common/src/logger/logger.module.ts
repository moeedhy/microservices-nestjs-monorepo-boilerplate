import { Module } from '@nestjs/common';
import { LoggerModule as NestPino } from 'nestjs-pino';

@Module({
  imports: [
    NestPino.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
