import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const getPort = (): number => {
  const portDefault = 3000;

  const portEnv = parseInt(process.env.PORT ?? '', 10);

  return isNaN(portEnv) ? portDefault : portEnv;
};

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const port = getPort();

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

bootstrap().catch((error) => {
  Logger.fatal('Error during app bootstrap', error);
  process.exit(1);
});
