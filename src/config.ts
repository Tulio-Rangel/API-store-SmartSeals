import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATA_BASE_NAME,
      port: process.env.DATA_BASE_PORT,
    },
    mongo: {
      dbName: process.env.NANEMONGO,
      user: process.env.USERMONGO,
      password: process.env.PASSWORDMONGO,
    },
    apiKey: process.env.API_KEY,
  };
});
