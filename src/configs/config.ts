import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgresUrl: process.env.DATABASE_URL,
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    faceAppId: process.env.APP_ID,
    faceAppSec: process.env.APP_SECRET,
    apiKey: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
    jwtSecret: process.env.JWT_SECRET,
    twitterKey: process.env.TWITTER_CONSUMER_KEY,
    twitterSecret: process.env.TWITTER_CONSUMER_SECRET,
  };
});
