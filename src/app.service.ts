import { Injectable, Inject } from '@nestjs/common';
import { ConfigType, ConfigService } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dataBase = this.configService.database.name;
    return `Hello Smart Seals Co, from ${apiKey} & ${dataBase}!`;
  }
  getPrueba() {
    const pruebaCollection = this.database.collection('prueba');
    return pruebaCollection.find().toArray();
  }
}
