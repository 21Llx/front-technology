import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  sayPost(): string {
    return 'Post!!!!!';
  }
}

@Injectable()
export class Post2Service {
  sayPost(): string {
    return 'post2222222!!!!!';
  }
}