import { registerAs } from '@nestjs/config';

export interface CoreConfig {
  ENV: string;
  PORT?: number;
  CORS_ORIGIN: string;
}

export default registerAs(
  'CORE',
  (): CoreConfig => ({
    ENV: process.env.ENV ?? 'local',
    PORT: Number.isInteger(Number(process.env.PORT))
      ? Number(process.env.PORT)
      : undefined,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
  }),
);
