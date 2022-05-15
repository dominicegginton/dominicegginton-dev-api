import { GithubService } from '../services/github.service';
export declare class RepositoriesController {
    private githubService;
    constructor(githubService: GithubService);
    getRepositories(): Promise<import("@octokit/graphql-schema").Maybe<import("@octokit/graphql-schema").Maybe<import("@octokit/graphql-schema").Repository>[]> | undefined>;
}
