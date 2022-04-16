import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';

import { GithubService } from '../services/github.service';

@Service()
@Controller('/repositories')
export class RepositoriesController {
  constructor(private githubService: GithubService) {}

  @Get()
  async getRepositories() {
    return this.githubService.repositories();
  }
}
