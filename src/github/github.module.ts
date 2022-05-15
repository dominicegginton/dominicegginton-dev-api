import { Module } from '@nestjs/common';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ReadmeController } from './controllers/readme/readme.controller';
import { RepositoriesController } from './controllers/repositories/repositories.controller';
import { GithubService } from './services/github/github.service';

function createHttpModuleOptions(
  configService: ConfigService,
): HttpModuleOptions {
  return {
    baseURL: configService.get<string>('GITHUB.URL'),
    auth: {
      username: 'dominicegginton',
      password: configService.get<string>('GITHUB.TOKEN'),
    },
  };
}

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: createHttpModuleOptions,
      inject: [ConfigService],
    }),
  ],
  controllers: [ReadmeController, RepositoriesController],
  providers: [GithubService],
})
export class GithubModule {}
