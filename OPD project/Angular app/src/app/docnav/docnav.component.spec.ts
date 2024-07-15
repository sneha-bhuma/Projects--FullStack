import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocnavComponent } from './docnav.component';

describe('DocnavComponent', () => {
  let component: DocnavComponent;
  let fixture: ComponentFixture<DocnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocnavComponent]
    });
    fixture = TestBed.createComponent(DocnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
