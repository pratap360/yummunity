import { TestBed } from '@angular/core/testing';

import { FullpostService } from './fullpost.service';

describe('FullpostService', () => {
  let service: FullpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
