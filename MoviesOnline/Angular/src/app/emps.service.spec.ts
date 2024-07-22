import { TestBed } from '@angular/core/testing';

import { EmpsService } from './emps.service';

describe('EmpsService', () => {
  let service: EmpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
