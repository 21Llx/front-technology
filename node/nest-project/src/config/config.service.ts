import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getConfig() {
    return {
      ver:"1.0",
      name:"config"
    };
  }

}

