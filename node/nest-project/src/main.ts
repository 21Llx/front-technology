import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cors from 'cors';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { userGuard } from './common/user.guard';
function middleWareAll(req, res, next) {
  if (true) {
    next();
  } else {
    res.send('error');
  }
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 生成swagger
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('这个接口文档我是自动生成的')
    .setVersion('1.0')
    .addTag('blog')
    .build();

  // 访问静态图片
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/upload',
  });

  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter())
  // 全局中间件只能是函数
  app.use(middleWareAll);
  app.useGlobalGuards(new userGuard()) //全局守卫
  app.use(cors()); //跨域处理
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
