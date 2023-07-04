import { TestBed } from '@angular/core/testing';

import { AuthInterceptionService } from './auth-interception.service';

describe('AuthInterceptionService', () => {
  let service: AuthInterceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
