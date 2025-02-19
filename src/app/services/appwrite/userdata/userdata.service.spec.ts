import { TestBed } from '@angular/core/testing';

import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  let service: UserdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
