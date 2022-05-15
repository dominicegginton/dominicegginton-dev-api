import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GithubService } from '../../services/github/github.service';
import { Repository } from '../../models/repository.interface';

@Controller('repositories')
export class RepositoriesController {
  constructor(private githubService: GithubService) {}

  @Get()
  getRepositories(): Observable<Repository[]> {
    return this.githubService.getRepositories();
  }
}
