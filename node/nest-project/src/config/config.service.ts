import { Injectable,Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG_OPTIONS') private configOption){

  }
  getConfig() {
    return this.configOption;
  }

}

