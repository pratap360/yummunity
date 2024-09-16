import { TestBed } from '@angular/core/testing';

import { PexelsService } from './pexels.service';

describe('PexelsService', () => {
  let service: PexelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PexelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
