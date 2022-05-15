import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { User } from '@octokit/graphql-schema';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { Repository } from '../../models/repository.interface';
import { Readme } from '../../models/readme.interface';

@Injectable()
export class GithubService {
  constructor(
    private configService: ConfigService,
    private http: HttpService,
  ) {}

  public getProfileReadme(): Observable<Readme> {
    return this.http
      .post<{ data: { repository: { object: Readme } } }>('', {
        operationName: 'readme',
        query: `
          query readme {
            repository(owner: "${this.configService.get<string>(
              'GITHUB.USERNAME',
            )}", name: "${this.configService.get<string>('GITHUB.USERNAME')}") {
              object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        `,
      })
      .pipe(
        map(
          (
            response: AxiosResponse<{
              data: { repository: { object: Readme } };
            }>,
          ) => response.data.data.repository.object,
        ),
      );
  }

  public getRepositories(): Observable<Repository[]> {
    return this.http
      .post<{ data: { viewer: User } }>('', {
        operationName: 'repositories',
        query: `
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
        `,
      })
      .pipe(
        map(
          (response: AxiosResponse<{ data: { viewer: User } }>) =>
            response.data.data.viewer.repositories.nodes,
        ),
      );
  }
}
