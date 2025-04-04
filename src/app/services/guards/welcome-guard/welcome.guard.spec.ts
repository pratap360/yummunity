import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { welcomeGuard } from './welcome.guard';

describe('welcomeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => welcomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
