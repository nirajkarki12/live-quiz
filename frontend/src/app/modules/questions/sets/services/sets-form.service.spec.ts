import { TestBed } from '@angular/core/testing';

import { SetsFormService } from './sets-form.service';

describe('SetsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetsFormService = TestBed.get(SetsFormService);
    expect(service).toBeTruthy();
  });
});
