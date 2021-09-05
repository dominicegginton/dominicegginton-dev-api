import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN, userAgent: 'api.dominicegginton.dev' })

export async function repositories (username) {
  const response = await octokit.rest.repos.listForUser({ username: username, type: 'all', sort: 'updated', direction: 'desc', per_page: 20, page: 1 })
  return response.data
}
