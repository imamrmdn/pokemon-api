import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  //
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  //
  app.enableCors({ origin: true, credentials: true });

  // global prefix
  app.setGlobalPrefix(process.env.APP_PREFIX);

  //
  await app.listen(process.env.APP_PORT || 8000);

  ////
  console.log('');
  console.log(
    `${process.env.APP_NAME} Service is running on: ${await app.getUrl()}`,
  );
  // console.log(`gRPC Service is running on: ${process.env.APP_PORT_RPC}`);
  console.log('');

}

main();
