import { TestBed } from '@angular/core/testing';

import { LapserviceService } from './lapservice.service';

describe('LapserviceService', () => {
  let service: LapserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LapserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
