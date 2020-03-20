import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config({ path: '.env' });

async function bootstrap() {
  // const fs = require('fs');
  // const keyFile  = fs.readFileSync('/etc/letsencrypt/live/gotubepro.com/privkey.pem');
  // const certFile = fs.readFileSync('/etc/letsencrypt/live/gotubepro.com/fullchain.pem');

  const app = await NestFactory.create(AppModule, {
    // httpsOptions: {
    //   key: keyFile,
    //   cert: certFile,
    // }
  });
  app.enableCors({
    origin: true,
    exposedHeaders: 'X-Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
  
}
bootstrap();
