import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAppManagementComponent } from './staff-app-management.component';

describe('StaffAppManagementComponent', () => {
  let component: StaffAppManagementComponent;
  let fixture: ComponentFixture<StaffAppManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAppManagementComponent]
    });
    fixture = TestBed.createComponent(StaffAppManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
