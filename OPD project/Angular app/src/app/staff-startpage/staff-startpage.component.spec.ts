import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffStartpageComponent } from './staff-startpage.component';

describe('StaffStartpageComponent', () => {
  let component: StaffStartpageComponent;
  let fixture: ComponentFixture<StaffStartpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffStartpageComponent]
    });
    fixture = TestBed.createComponent(StaffStartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
