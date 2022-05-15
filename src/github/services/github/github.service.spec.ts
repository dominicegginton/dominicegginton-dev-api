import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import DoneCallback = jest.DoneCallback;

import { GithubService } from './github.service';
import { Readme } from '../../models/readme.interface';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { Repository } from 'src/github/models/repository.interface';

describe('GithubService', () => {
  let service: GithubService;
  const mockConfigService = {
    get: jest.fn((token: string) => {
      if (token === 'GITHUB.USERNAME') return 'foo';
      else return null;
    }),
  };
  const mockHttpService = {
    post: jest.fn(),
  };
  const mockExceptionService = {
    createHandleError: jest.fn(
      () => () => (err: Error) => throwError(() => err),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfileReadme', () => {
    it('should get readme', (done: DoneCallback) => {
      jest.spyOn(mockHttpService, 'post').mockReturnValue(
        of(<AxiosResponse>{
          data: {
            data: {
              repository: {
                object: {
                  text: 'foo bar baz',
                },
              },
            },
          },
          headers: {},
          status: 200,
          statusText: 'OK',
          request: null,
        }),
      );

      service.getProfileReadme().subscribe({
        next: (readme: Readme) => {
          expect(readme).toEqual({ text: 'foo bar baz' });
          done();
        },
      });
    });

    it('should throw error if request to github fails', (done: DoneCallback) => {
      jest
        .spyOn(mockHttpService, 'post')
        .mockReturnValue(throwError(() => new Error('foo')));

      service.getProfileReadme().subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('foo'));
          done();
        },
      });
    });

    it('should throw error if github api returns errors', (done: DoneCallback) => {
      jest.spyOn(mockHttpService, 'post').mockReturnValue(
        of(<AxiosResponse>{
          data: {
            errors: {},
          },
          headers: {},
          status: 200,
          statusText: 'OK',
          request: null,
        }),
      );

      service.getProfileReadme().subscribe({
        error: (err) => {
          expect(err).toEqual(
            new TypeError(
              "Cannot read properties of undefined (reading 'repository')",
            ),
          );
          done();
        },
      });
    });
  });

  describe('getRepositories', () => {
    it('should get repositories', (done: DoneCallback) => {
      jest.spyOn(mockHttpService, 'post').mockReturnValue(
        of(<AxiosResponse>{
          data: {
            data: {
              viewer: {
                repositories: {
                  nodes: [],
                },
              },
            },
          },
          headers: {},
          status: 200,
          statusText: 'OK',
          request: null,
        }),
      );

      service.getRepositories().subscribe({
        next: (repositories: Repository[]) => {
          expect(repositories).toEqual([]);
          done();
        },
      });
    });

    it('should throw error if request to github fails', (done: DoneCallback) => {
      jest
        .spyOn(mockHttpService, 'post')
        .mockReturnValue(throwError(() => new Error('foo')));

      service.getRepositories().subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('foo'));
          done();
        },
      });
    });

    it('should throw error if github api returns errors', (done: DoneCallback) => {
      jest.spyOn(mockHttpService, 'post').mockReturnValue(
        of(<AxiosResponse>{
          data: {
            errors: {},
          },
          headers: {},
          status: 200,
          statusText: 'OK',
          request: null,
        }),
      );

      service.getRepositories().subscribe({
        error: (err) => {
          expect(err).toEqual(
            new TypeError(
              "Cannot read properties of undefined (reading 'viewer')",
            ),
          );
          done();
        },
      });
    });
  });
});
