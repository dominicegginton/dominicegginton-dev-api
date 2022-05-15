import { Test, TestingModule } from '@nestjs/testing';
import {of, throwError} from 'rxjs';
import DoneCallback = jest.DoneCallback;

import { GithubService } from '../../services/github/github.service';
import { ReadmeController } from './readme.controller';
import { Readme } from '../../models/readme.interface';

describe('ReadmeController', () => {
  let controller: ReadmeController;
  const mockGitHubService = {
    getProfileReadme: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadmeController],
      providers: [
        {
          provide: GithubService,
          useValue: mockGitHubService,
        },
      ],
    }).compile();

    controller = module.get<ReadmeController>(ReadmeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfileReadme', () => {
    it('should return readme', (done: DoneCallback) => {
      jest
        .spyOn(mockGitHubService, 'getProfileReadme')
        .mockReturnValue(of(<Readme>{ text: 'foo bar baz' }));

      controller.getReadme().subscribe({
        next: (readme: Readme) => {
          expect(readme).toEqual(<Readme>{ text: 'foo bar baz' });
          done();
        },
      });
    });

    it('should return error', (done: DoneCallback) => {
      jest
        .spyOn(mockGitHubService, 'getProfileReadme')
        .mockReturnValue(throwError(() => new Error('foo')));

      controller.getReadme().subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('foo'));
          done();
        },
      });
    });
  });
});
