import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const environment = this.configService.environment;
    return `[C10-Squad-Search-Engine]💚 Platzi Master : ${environment} Environment`;
  }
}
