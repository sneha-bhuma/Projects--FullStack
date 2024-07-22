import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapComponent } from './lap.component';

describe('LapComponent', () => {
  let component: LapComponent;
  let fixture: ComponentFixture<LapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
