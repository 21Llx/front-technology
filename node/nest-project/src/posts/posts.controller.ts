import { Request } from 'express';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { PostService, Post2Service } from './post.service';
import { AuthGuard, RoleGuard } from './post.guard';
import { LoggingInterceptor } from './post.interceptor';
import { User } from './post.decorator';
import { ApiTags, ApiOperation, ApiParam,ApiQuery  } from '@nestjs/swagger';
import {CreateGuardDto} from "./post.dot"
@Controller('post')
// @UseGuards(AuthGuard)
@UseGuards(RoleGuard)
@ApiTags('配置')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiParam({name:"id",description:"用户id"})
  @ApiQuery({name:"id2",description:"用户id2"})
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    console.log(this.postService);
    return this.postService.sayPost();
    return 'xxx';
  }
  @Post('guard')
  @ApiOperation({
    summary: '守卫',
    description: '守卫处理',
  })
  @UseGuards(AuthGuard)
  getGuard(): string {
    return 'Guard';
  }
  @Post('user')
  getUserInfo(@User({ a: 1 }) user): string {
    console.log('param', user);
    return 'user';
  }
  @Post('role')
  @SetMetadata('role', ['admin'])
  getRole() {
    return {
      role: 'admin',
    };
  }
}
