import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Param,
  Query,
  ArgumentsHost,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import {ServiceService3} from "./service/service.service"
import {ConfigService} from "./config/config.service"

@Controller("app")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly serviceService: ServiceService3,
    private readonly configService: ConfigService,

  ) {}

  @Get(':id')
  getHello(@Param() params,@Query() query,@Headers() headers): string {
    console.log(params)
    console.log(query)
    console.log(headers)
    console.log(this.serviceService.get("123"))
    console.log(this.configService.getConfig())
    return this.appService.getHello();
  }
 @Post("post")
//  返回状态码
//  @HttpCode(500) 
 create(@Body() body){
  console.log(body)

  return "app/post"

 }
 @Post("error")
 //  返回状态码
 //  @HttpCode(500) 
  getError(){
   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
