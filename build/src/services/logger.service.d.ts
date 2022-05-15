import { Logger } from 'pino';
import { ConfigService } from '../services/config.service';
export declare class LoggerService {
    private configService;
    logger: Logger;
    constructor(configService: ConfigService);
}
