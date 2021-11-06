/* IMPORT MODULES */
import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import type { GraphQlQueryResponseData } from '@octokit/graphql';

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
    'user-agent': 'dominicegginton-dev-api',
  },
});

/* OCTOKIT */
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'dominicegginton-dev-api',
});

/**
 * Lists public repositories for the specified user
 * @param {string} username username of user
 * @returns list of users public repositories
 */
export async function repositories() {
  const response = await octokit.repos.listForAuthenticatedUser({
    type: 'all',
    sort: 'pushed',
    direction: 'desc',
    per_page: 10,
    page: 1,
  });
  return response.data;
}

export async function status() {
  const response: GraphQlQueryResponseData = await graphqlWithAuth(`
    {
      user(login: "dominicegginton") {
        status {
          emojiHTML
          message
        }
      }
    }
  `);

  return response.user.status;
}
