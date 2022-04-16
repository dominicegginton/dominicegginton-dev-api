import { Service } from 'typedi';
import pino, { Logger } from 'pino';

import { ConfigService } from '../services/config.service';

@Service()
export class LoggerService {
  logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = pino({ level: configService.config.LOGGER_LEVEL });
  }
}
