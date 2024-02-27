import { Injectable,Inject } from '@nestjs/common';
import { PostService } from './posts/post.service';

@Injectable()
export class AppService {
  constructor(private readonly postService:PostService,@Inject('PROSERVICE') private proSerive) {}

  private readonly cats = [];
  getHello(): string {
    return 'Hello World!';
  }
  create(cat) {
    console.log(this.postService.sayPost())
    console.log(this.proSerive.getPro())
    this.cats.push(cat);
  }

  findAll() {
    // console.log(first)
    return this.cats;
  }
}

@Injectable()
export class ProService {
  static getPro(): string {
    return 'Pro!!!!';
  }
}
