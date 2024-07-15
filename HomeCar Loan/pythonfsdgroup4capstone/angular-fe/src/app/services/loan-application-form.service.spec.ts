import { TestBed } from '@angular/core/testing';

import { LoanApplicationFormService } from './loan-application-form.service';

describe('LoanApplicationFormService', () => {
  let service: LoanApplicationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
