import { Module } from '@nestjs/common';

import {
  ModelDefinition,
  MongooseModule,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): MongooseModuleFactoryOptions => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
