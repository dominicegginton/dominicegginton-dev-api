import { graphql } from '@octokit/graphql';
import { User } from '@octokit/graphql-schema';

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
        repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            name
            url
            description
            updatedAt
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

export async function status() {
  const response = await graphqlWithAuth<{ viewer: User }>(`
    query status {
      viewer {
        status {
          emojiHTML
          message
        }
      }
    }
  `);

  return response.viewer.status;
}
