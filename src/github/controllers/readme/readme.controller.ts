import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GithubService } from '../../services/github/github.service';
import { Readme } from '../../models/readme.interface';

@Controller('readme')
export class ReadmeController {
  constructor(private githubService: GithubService) {}

  @Get()
  getReadme(): Observable<Readme> {
    return this.githubService.getProfileReadme();
  }
}
