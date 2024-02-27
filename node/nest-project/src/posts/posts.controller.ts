import { Controller, Get,UseGuards,Post,UseInterceptors } from '@nestjs/common';
import {PostService,Post2Service} from "./post.service"
import {AuthGuard} from "./post.guard"
import {LoggingInterceptor} from "./post.interceptor"
import {User} from "./post.decorator"
@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService:PostService) {}

  @Get(":id")
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    console.log(this.postService)
    return this.postService.sayPost();
    return "xxx"
  }
  @Post("guard")
  // @UseGuards(AuthGuard)
  getGuard(): string {
    return "Guard";
  }
  @Post("user")
  getUserInfo(@User({a:1}) user):string{
    console.log("param",user)
    return "user"
  }
}