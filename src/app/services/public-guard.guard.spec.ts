import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { publicGuardGuard } from './public-guard.guard';

describe('publicGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => publicGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
