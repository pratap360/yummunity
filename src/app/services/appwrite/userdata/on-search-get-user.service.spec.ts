import { TestBed } from '@angular/core/testing';

import { OnSearchGetUserService } from './on-search-get-user.service';

describe('OnSearchGetUserService', () => {
  let service: OnSearchGetUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnSearchGetUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
