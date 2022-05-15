import { registerAs } from '@nestjs/config';

export interface GithubConfig {
  URL: string;
  TOKEN: string;
  USERNAME: string;
}

export default registerAs(
  'GITHUB',
  (): GithubConfig => ({
    URL: process.env.GITHUB_URL,
    TOKEN: process.env.GITHUB_TOKEN,
    USERNAME: process.env.GITHUB_USERNAME,
  }),
);
