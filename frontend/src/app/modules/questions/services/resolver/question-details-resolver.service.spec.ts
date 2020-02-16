import { TestBed } from '@angular/core/testing';

import { QuestionDetailsResolverService } from './question-details-resolver.service';

describe('QuestionDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionDetailsResolverService = TestBed.get(QuestionDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
