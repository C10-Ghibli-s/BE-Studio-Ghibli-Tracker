import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '[C10-Squad-Search-Engine]💚 Platzi Master';
  }
}
