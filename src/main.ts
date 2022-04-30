import 'reflect-metadata';
import { createKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';

import { ReadmeController } from './controllers/readme.controller';
import { RepositoriesController } from './controllers/repositories..controller';

async function main() {
  useContainer(Container);

  const CONFIG = Container.get(ConfigService).config;
  const LOGGER = Container.get(LoggerService).logger;

  const APP = createKoaServer({
    cors: {
      origin: CONFIG.CORS_ORIGIN,
    },
    controllers: [ReadmeController, RepositoriesController],
  });
  APP.listen(CONFIG.PORT, () => LOGGER.info({ PORT: CONFIG.PORT }, 'server started'));
}

main();
