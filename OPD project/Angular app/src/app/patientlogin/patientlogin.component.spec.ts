import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientloginComponent } from './patientlogin.component';

describe('PatientloginComponent', () => {
  let component: PatientloginComponent;
  let fixture: ComponentFixture<PatientloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientloginComponent]
    });
    fixture = TestBed.createComponent(PatientloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
