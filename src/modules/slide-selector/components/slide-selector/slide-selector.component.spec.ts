import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideSelectorComponent } from './slide-selector.component';

describe('SlideSelectorComponent', () => {
  let component: SlideSelectorComponent;
  let fixture: ComponentFixture<SlideSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
