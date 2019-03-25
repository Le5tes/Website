import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SlideSelectorComponent } from './slide-selector.component';

describe('SlideSelectorComponent', () => {
  let component: SlideSelectorComponent;
  let fixture: ComponentFixture<SlideSelectorComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideSelectorComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should display the first three items passed in', () => {
    component.items = [ {name: 'myItem', largeThumbnail: 'url/url'},{name: 'myItem2', largeThumbnail: 'url/url2'},{name: 'myItem3', largeThumbnail: 'url/url3'}]
    fixture.detectChanges();
    expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
    expect(nativeElement.querySelector('img[src="url/url2"]')).to.exist;
    expect(nativeElement.querySelector('img[src="url/url3"]')).to.exist;
  })
});
