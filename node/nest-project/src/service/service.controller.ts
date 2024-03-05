import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import {PostService} from "../posts/post.service"
@Controller('service')
export class ServiceController {
  constructor(
    @Inject('CurrentService') private readonly serviceService: ServiceService,
    @Inject('service2') private readonly serviceService2: any,
    @Inject('Info') private info,
    private readonly postService: PostService,
  ) {}

  @Post()
  create() {
    console.log(this.info);
    console.log(this.serviceService2.get(123))
    console.log(this.postService.sayPost())
    return this.serviceService.create(1);
  }

 
}
