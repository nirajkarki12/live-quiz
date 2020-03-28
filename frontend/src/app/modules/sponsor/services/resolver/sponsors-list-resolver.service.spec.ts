import { TestBed } from '@angular/core/testing';

import { SponsorsListResolverService } from './sponsors-list-resolver.service';

describe('SponsorsListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SponsorsListResolverService = TestBed.get(SponsorsListResolverService);
    expect(service).toBeTruthy();
  });
});
