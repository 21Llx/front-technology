import { Module } from '@nestjs/common';
import {
  ServiceService,
  ServiceService2,
  ServiceService3,
} from './service.service';
import { ServiceController } from './service.controller';

@Module({
  controllers: [ServiceController],
  providers: [
    {
      provide: 'CurrentService',
      useClass: ServiceService,
    },
    {
      provide: 'Info',
      useValue: { name: 'service', age: 120 },
    },
    {
      provide: 'service2',
      useFactory() {
        return new ServiceService2();
      },
    },
    ServiceService3,
  ],
  // 导出的 在 providers 需要直接声明
  exports: [ServiceService3],
})
export class ServiceModule {}
