import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentManagementComponent } from './patient-appointment-management.component';

describe('PatientAppointmentManagementComponent', () => {
  let component: PatientAppointmentManagementComponent;
  let fixture: ComponentFixture<PatientAppointmentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientAppointmentManagementComponent]
    });
    fixture = TestBed.createComponent(PatientAppointmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
