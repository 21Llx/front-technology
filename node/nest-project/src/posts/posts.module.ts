import { Module,Global } from '@nestjs/common';
import { PostController } from './posts.controller';
import {PostService,Post2Service} from "./post.service"
@Global()
@Module({
  providers:[PostService],
  controllers: [PostController],
  exports: [PostService]

})
export class PostsModule {}
