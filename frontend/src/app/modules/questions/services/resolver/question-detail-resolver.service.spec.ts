import { TestBed } from '@angular/core/testing';

import { QuestionDetailResolverService } from './question-detail-resolver.service';

describe('QuestionDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionDetailResolverService = TestBed.get(QuestionDetailResolverService);
    expect(service).toBeTruthy();
  });
});
