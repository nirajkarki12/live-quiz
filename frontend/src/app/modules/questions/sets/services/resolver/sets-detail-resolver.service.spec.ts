import { TestBed } from '@angular/core/testing';

import { SetsDetailResolverService } from './sets-detail-resolver.service';

describe('SetsDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetsDetailResolverService = TestBed.get(SetsDetailResolverService);
    expect(service).toBeTruthy();
  });
});
