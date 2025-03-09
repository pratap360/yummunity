import { TestBed } from '@angular/core/testing';

import { UsercontextService } from './usercontext.service';

describe('UsercontextService', () => {
  let service: UsercontextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercontextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
