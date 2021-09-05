/* IMPORT MODULES */
import { Octokit } from '@octokit/rest'

/* ENVIRONMENT VARIABLES */
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

/* OCTOKIT */
const octokit = new Octokit({ auth: GITHUB_TOKEN, userAgent: 'api.dominicegginton.dev' })

/**
 * Lists public repositories for the specified user
 * @param {String} username username of user
 * @returns 
 */
export async function repositories (username) {
  const response = await octokit.rest.repos.listForUser({ username: username, type: 'all', sort: 'updated', direction: 'desc', per_page: 20, page: 1 })
  return response.data
}
