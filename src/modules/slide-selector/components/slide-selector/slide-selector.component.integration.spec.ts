import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SlideSelectorComponent } from './slide-selector.component';
import { Component, ViewChild } from '@angular/core';
import { PreviewComponent } from '../preview/preview.component';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  template: '<app-slide-selector [items]="items"></app-slide-selector>',
  standalone: false
})
class WrapperComponent {
    @ViewChild(SlideSelectorComponent)
    public child: SlideSelectorComponent;

    public items = [ {name: 'myItem', image: 'url/url'}, {name: 'myItem', image: 'url/url2'}, {name: 'myItem', image: 'url/url3'}];
}

describe('slide-selector-component integration', () => {
  let fixture: ComponentFixture<WrapperComponent>;
  let wrapper: WrapperComponent; 
  let component: SlideSelectorComponent; 
  let nativeElement: HTMLElement;
  let mockNavigationService;
  const context = describe

  beforeEach(waitForAsync(() => {
    mockNavigationService = {
      goto: vi.fn()
    };

    TestBed.configureTestingModule({
      declarations: [ 
        SlideSelectorComponent,
        WrapperComponent,
        PreviewComponent,
        ImagePipe
      ],
      providers: [
        {provide: NavigationService, useValue: mockNavigationService}
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
        expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
        expect(nativeElement.querySelector('[data-qa="current-item-preview"]')).to.exist;
        expect(nativeElement.querySelector('img[src="url/url2"]')).to.exist;
        expect(nativeElement.querySelector('[data-qa="next-item-preview"]')).to.exist;
        expect(nativeElement.querySelector('img[src="url/url3"]')).to.exist;
      });
    });
  });
});