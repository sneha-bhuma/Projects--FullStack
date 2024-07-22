import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsDetailsComponent } from './emps-details.component';

describe('EmpsDetailsComponent', () => {
  let component: EmpsDetailsComponent;
  let fixture: ComponentFixture<EmpsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
