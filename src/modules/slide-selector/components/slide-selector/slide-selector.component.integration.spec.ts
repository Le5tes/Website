import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'chai';

import { SlideSelectorComponent } from './slide-selector.component';
import { Component, ViewChild } from '@angular/core';

@Component({
   template: '<app-slide-selector [items]="items"></app-slide-selector>'
})
class WrapperComponent {
    @ViewChild(SlideSelectorComponent)
    public child: SlideSelectorComponent;

    public items = [ {name: 'myItem', largeThumbnail: 'url/url'}, {name: 'myItem', largeThumbnail: 'url/url'}, {name: 'myItem', largeThumbnail: 'url/url'}];
}

describe('slide-selector-component integration', () => {
let fixture: ComponentFixture<WrapperComponent>;
let wrapper: WrapperComponent; 
let component: SlideSelectorComponent; 
let nativeElement: HTMLElement;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          SlideSelectorComponent,
          WrapperComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    component = wrapper.child;
  });

  it('should be accessable', () => {
    expect(component).to.exist;
  });

  describe('showing content', () => {
    context('when passed three or less items', () => {
      it('should display the items\' previews', () => {
        expect(nativeElement.querySelector('[data-qa="previous-item-preview"]')).to.exist;
        expect(nativeElement.querySelector('[data-qa="current-item-preview"]')).to.exist;
        expect(nativeElement.querySelector('[data-qa="next-item-preview"]')).to.exist;
      });
    });
  });
});