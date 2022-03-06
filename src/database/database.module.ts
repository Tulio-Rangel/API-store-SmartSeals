import { Module, Global, Inject } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType, ConfigService } from '@nestjs/config';

import config from 'src/config';

const API_KEY = '12345';
const API_KEY_PROD = 'Prodkey';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, dbName } = configService.mongo;
        return {
          uri: `mongodb+srv://${user}:${password}@cluster0.ty3yp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, dbName } = configService.mongo;
        const uri = `mongodb+srv://${user}:${password}@cluster0.ty3yp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, {
          //useNewUrlParser: true,
          //useUnifiedTopology: true,
        });
        await client.connect();
        const database = client.db('SmartSeals');
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
