import { Observable } from 'rxjs';
import { GithubService } from '../../services/github/github.service';
import { Repository } from '../../models/repository.interface';
export declare class RepositoriesController {
    private githubService;
    constructor(githubService: GithubService);
    getRepositories(): Observable<Repository[]>;
}
