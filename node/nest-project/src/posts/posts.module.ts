import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import {PostService,Post2Service} from "./post.service"
@Module({
  // providers: [{
  //   provide: PostService,
  //     useValue: Post2Service,
  // }],
  providers:[PostService],
  controllers: [PostController],
  exports: [PostService]

})
export class PostsModule {}
