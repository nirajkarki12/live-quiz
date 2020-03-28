import { TestBed } from '@angular/core/testing';

import { SponsorDetailResolverService } from './sponsor-detail-resolver.service';

describe('SponsorDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SponsorDetailResolverService = TestBed.get(SponsorDetailResolverService);
    expect(service).toBeTruthy();
  });
});
