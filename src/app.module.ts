import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';

import coreConfig from './config/core.config';
import githubConfig from './config/github.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [coreConfig, githubConfig] }),
    GithubModule,
  ],
})
export class AppModule {}
