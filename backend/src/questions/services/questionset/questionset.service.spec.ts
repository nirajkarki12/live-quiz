import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsetService } from './questionset.service';

describe('QuestionsetService', () => {
  let service: QuestionsetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsetService],
    }).compile();

    service = module.get<QuestionsetService>(QuestionsetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
