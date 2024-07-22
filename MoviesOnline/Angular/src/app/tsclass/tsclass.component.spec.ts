import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsclassComponent } from './tsclass.component';

describe('TsclassComponent', () => {
  let component: TsclassComponent;
  let fixture: ComponentFixture<TsclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TsclassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TsclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
