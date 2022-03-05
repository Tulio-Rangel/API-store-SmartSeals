import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService,) {}
  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    const dataBase = this.config.get('DATA_BASE_NAME')
    return `Hello Smart Seals Co, from ${apiKey} & ${dataBase}!`;
  }
}
