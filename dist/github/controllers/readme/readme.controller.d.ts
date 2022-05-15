import { Observable } from 'rxjs';
import { GithubService } from '../../services/github/github.service';
import { Readme } from '../../models/readme.interface';
export declare class ReadmeController {
    private githubService;
    constructor(githubService: GithubService);
    getReadme(): Observable<Readme>;
}
