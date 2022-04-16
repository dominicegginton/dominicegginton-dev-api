import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';

import { GithubService } from '../services/github.service';

@Service()
@Controller('/readme')
export class ReadmeController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async getReadme() {
    return await this.githubService.readme();
  }
}
