import { TestBed } from '@angular/core/testing';

import { UserdbService } from './userdb.service';

describe('UserdbService', () => {
  let service: UserdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
