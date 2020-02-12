import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsetController } from './questionset.controller';

describe('Questionset Controller', () => {
  let controller: QuestionsetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsetController],
    }).compile();

    controller = module.get<QuestionsetController>(QuestionsetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
