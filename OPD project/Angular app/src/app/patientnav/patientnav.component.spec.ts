import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientnavComponent } from './patientnav.component';

describe('PatientnavComponent', () => {
  let component: PatientnavComponent;
  let fixture: ComponentFixture<PatientnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientnavComponent]
    });
    fixture = TestBed.createComponent(PatientnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
