import { Repository, User } from '@octokit/graphql-schema';
import { Service } from 'typedi';
import { graphql } from '@octokit/graphql';

import { ConfigService } from '../services/config.service';

@Service()
export class GithubService {
  graphql: typeof graphql;

  constructor(private configService: ConfigService) {
    this.graphql = graphql.defaults({
      headers: {
        authorization: `token ${this.configService.config.GITHUB_TOKEN}`,
        'user-agent': this.configService.config.APP_NAME,
      },
    });
  }

  public async readme() {
    const response = await this.graphql<{ repository: Repository }>(`
    query readme {
      repository(owner: "dominicegginton", name: "dominicegginton") {
        object(expression: "HEAD:README.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  `);

    return response.repository.object;
  }

  async repositories() {
    const response = await this.graphql<{ viewer: User }>(`
    query repositories {
      viewer {
        repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            name
            url
            description
            pushedAt
            stargazerCount
            languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
              nodes {
                color
                name
              }
            }
          }
        }
      }
    }
  `);

    return response.viewer.repositories.nodes;
  }
}
