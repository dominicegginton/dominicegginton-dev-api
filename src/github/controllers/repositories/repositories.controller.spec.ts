import { Test, TestingModule } from '@nestjs/testing';
import DoneCallback = jest.DoneCallback;
import { of, throwError } from 'rxjs';

import { RepositoriesController } from './repositories.controller';
import { GithubService } from '../../services/github/github.service';
import { Repository } from '../../models/repository.interface';

describe('RepositoriesController', () => {
  let controller: RepositoriesController;
  const mockGitHubService = {
    getRepositories: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        {
          provide: GithubService,
          useValue: mockGitHubService,
        },
      ],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRepositories', () => {
    it('should return repositories', (done: DoneCallback) => {
      jest
        .spyOn(mockGitHubService, 'getRepositories')
        .mockReturnValue(of(<Repository[]>[{ name: 'foo' }]));

      controller.getRepositories().subscribe({
        next: (repositories: Repository[]) => {
          expect(repositories).toEqual(<Repository[]>[{ name: 'foo' }]);
          done();
        },
      });
    });

    it('should return error', (done: DoneCallback) => {
      jest
        .spyOn(mockGitHubService, 'getRepositories')
        .mockReturnValue(throwError(() => new Error('foo')));

      controller.getRepositories().subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('foo'));
          done();
        },
      });
    });
  });
});
