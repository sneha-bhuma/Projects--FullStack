import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegManagementComponent } from './patient-reg-management.component';

describe('PatientRegManagementComponent', () => {
  let component: PatientRegManagementComponent;
  let fixture: ComponentFixture<PatientRegManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientRegManagementComponent]
    });
    fixture = TestBed.createComponent(PatientRegManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
