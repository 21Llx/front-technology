import { Controller, Get,Post,Req,Res,Body,HttpException,HttpStatus,ParseIntPipe,Param,Query } from '@nestjs/common';
import { AppService } from './app.service';
import {PostService} from "./posts/post.service"
import { Request } from 'express';
import {CreateAppDto} from "./app.dot"
import { ConfigService } from './config/config.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly postService:PostService,private readonly configService:ConfigService) {}

  @Get('bar/:id')
  getHello(@Param("id",ParseIntPipe) id:number,@Query("num",ParseIntPipe) num:number): string {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.appService.getHello();
  }
  @Post('create')
  async getPost(@Body() body:CreateAppDto){
    console.log(body)
    this.appService.create(body)
    return body
  }
  @Get('find') 
  find(): any[] {
    
    console.log(this.postService.sayPost())
    return this.appService.findAll();
  }
}



@Controller('other')
export class OtherController {
  constructor(private readonly postService:PostService) {}

  @Get()
  getHello(@Req() request: Request): string {
    return this.postService.sayPost();
  }

}