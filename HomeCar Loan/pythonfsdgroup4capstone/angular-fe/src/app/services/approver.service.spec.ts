import { TestBed } from '@angular/core/testing';

import { ApproverService } from './services/approver.service';

describe('ApproverService', () => {
  let service: ApproverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
