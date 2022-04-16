import { Service } from 'typedi';

import { Config } from '../models/config';

@Service()
export class ConfigService {
  config: Config;

  constructor() {
    this.config = <Config>{
      APP_NAME: process.env.npm_package_name,
      PORT: +process.env.PORT!,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      CORS_ORIGIN: process.env.CORS_ORIGIN,
      LOGGER_LEVEL: process.env.LOGGER_LEVEL ?? 'warn',
    };
  }
}
