import { ComponentFixture, TestBed } from '@angular/core/testing';

import { React3Component } from './react3.component';

describe('React3Component', () => {
  let component: React3Component;
  let fixture: ComponentFixture<React3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [React3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(React3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
