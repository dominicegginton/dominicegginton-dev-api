/* IMPORT MODULES */
import { Octokit } from '@octokit/rest';

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
export default async function repositories(username: string) {
  const response = await octokit.repos.listForUser({
    username,
    type: 'all',
    sort: 'pushed',
    direction: 'desc',
    per_page: 10,
    page: 1,
  });
  return response.data;
}
