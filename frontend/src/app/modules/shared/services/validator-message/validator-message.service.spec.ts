import { TestBed, inject } from '@angular/core/testing';

import { ValidatorMessageService } from './validator-message.service';

describe('ValidatorMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorMessageService]
    });
  });

  it('should be created', inject([ValidatorMessageService], (service: ValidatorMessageService) => {
    expect(service).toBeTruthy();
  }));
});
