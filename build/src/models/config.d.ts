import { Level } from 'pino';
export interface Config {
    APP_NAME: string;
    PORT: number;
    GITHUB_TOKEN: string;
    CORS_ORIGIN: string;
    LOGGER_LEVEL: Level;
}
