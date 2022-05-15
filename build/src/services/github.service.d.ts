import { Repository } from '@octokit/graphql-schema';
import { graphql } from '@octokit/graphql';
import { ConfigService } from '../services/config.service';
export declare class GithubService {
    private configService;
    graphql: typeof graphql;
    constructor(configService: ConfigService);
    readme(): Promise<import("@octokit/graphql-schema").Maybe<import("@octokit/graphql-schema").GitObject> | undefined>;
    repositories(): Promise<import("@octokit/graphql-schema").Maybe<import("@octokit/graphql-schema").Maybe<Repository>[]> | undefined>;
}
