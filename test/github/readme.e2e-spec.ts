import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { GithubService } from '../../src/github/services/github/github.service';
import { of, throwError } from 'rxjs';
import DoneCallback = jest.DoneCallback;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let githubService: GithubService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    githubService = moduleFixture.get<GithubService>(GithubService);
    await app.init();
  });

  describe('(GET) /readme', () => {
    it('should get readme', (done: DoneCallback) => {
      jest
        .spyOn(githubService, 'getProfileReadme')
        .mockReturnValue(of({ text: 'foo bar baz' }));

      const response = request(app.getHttpServer())
        .get('/readme')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual({ text: 'foo bar baz' });
          done();
        });
    });

    it('should return a 500 status on internal server error', (done: DoneCallback) => {
      jest
        .spyOn(githubService, 'getProfileReadme')
        .mockReturnValue(throwError(() => new Error('foo')));

      const response = request(app.getHttpServer())
        .get('/readme')
        .then((response) => {
          expect(response.status).toEqual(500);
          expect(response.body).toEqual({
            message: 'Internal server error',
            statusCode: 500,
          });
          done();
        });
    });
  });

  describe('(GET) /repositories', () => {
    it('should get repositories', (done: DoneCallback) => {
      jest
        .spyOn(githubService, 'getRepositories')
        .mockReturnValue(of([]));

      const response = request(app.getHttpServer())
        .get('/repositories')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual([]);
          done();
        });
    });

    it('should return a 500 status on internal server error', (done: DoneCallback) => {
      jest
        .spyOn(githubService, 'getRepositories')
        .mockReturnValue(throwError(() => new Error('foo')));

      const response = request(app.getHttpServer())
        .get('/repositories')
        .then((response) => {
          expect(response.status).toEqual(500);
          expect(response.body).toEqual({
            message: 'Internal server error',
            statusCode: 500,
          });
          done();
        });
    });
  });
});
