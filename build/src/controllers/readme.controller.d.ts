import { GithubService } from '../services/github.service';
export declare class ReadmeController {
    private readonly githubService;
    constructor(githubService: GithubService);
    getReadme(): Promise<import("@octokit/graphql-schema").Maybe<import("@octokit/graphql-schema").GitObject> | undefined>;
}
