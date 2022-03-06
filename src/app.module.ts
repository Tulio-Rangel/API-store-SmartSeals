import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoClient } from 'mongodb';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

const uri =
  'mongodb+srv://TulioR:960120tulio@cluster0.ty3yp.mongodb.net/SmartSeals?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

async function run() {
  await client.connect();
  const database = client.db('SmartSeals');
  const pruebaCollection = database.collection('prueba');
  const prueba = await pruebaCollection.find().toArray();
  console.log(prueba);
}
run();

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATA_BASE_NAME: Joi.string().required(),
        DATA_BASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
