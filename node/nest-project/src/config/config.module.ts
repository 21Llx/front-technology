import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({})
export class ConfigModule {
  static register(config): DynamicModule {
    return {
      module: ConfigModule,
      providers: [{
        provide: 'CONFIG_OPTIONS',
        useValue: config,
      },ConfigService],
      controllers: [ConfigController],
      exports: [ConfigService],
    };
  }
}