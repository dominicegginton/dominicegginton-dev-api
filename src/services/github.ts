import { graphql } from '@octokit/graphql';
import { Repository, User } from '@octokit/graphql-schema';

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
    'user-agent': process.env.npm_package_name,
  },
});

export async function repositories() {
  const response = await graphqlWithAuth<{ viewer: User }>(`
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

export async function readme() {
  const response = await graphqlWithAuth<{ repository: Repository }>(`
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
