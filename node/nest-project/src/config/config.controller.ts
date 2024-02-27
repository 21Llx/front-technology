import { Controller, Get,Inject } from '@nestjs/common';

@Controller('config')

export class ConfigController {

  constructor(@Inject('CONFIG_OPTIONS') private config: Record<string, any>) {}
  @Get("")
  getHello(): string {
    console.log(this.config)
    return "config!!!!!!"
  }
  
} 