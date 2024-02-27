import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import {LoggerMiddleware} from "./logger.middler"
import { AppController } from './app.controller';
import { AppService,ProService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from './config/config.module';


@Module({
  imports: [PostsModule,ConfigModule.register({type:1})],
  controllers: [AppController],
  providers: [AppService,{
    provide: 'PROSERVICE',
    useValue: ProService,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AppController);
  }
}