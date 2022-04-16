import 'reflect-metadata';
import { createKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';
import { GithubService } from './services/github.service';

import { ReadmeController } from './controllers/readme.controller';
import { RepositoriesController } from './controllers/repositories..controller';

async function main() {
  Container.set(ConfigService, new ConfigService());
  Container.set(LoggerService, new LoggerService(Container.get(ConfigService)));
  Container.set(GithubService, new GithubService(Container.get(ConfigService)));
  Container.set(ReadmeController, new ReadmeController(Container.get(GithubService)));
  Container.set(RepositoriesController, new RepositoriesController(Container.get(GithubService)));
  useContainer(Container);

  const CONFIG = Container.get(ConfigService).config;
  const LOGGER = Container.get(LoggerService);

  const APP = createKoaServer({
    cors: {
      origin: CONFIG.CORS_ORIGIN,
    },
    controllers: [ReadmeController, RepositoriesController],
  });
  APP.listen(CONFIG.PORT, () => LOGGER.logger.info({ PORT: CONFIG.PORT }, 'server started'));
}

main();
