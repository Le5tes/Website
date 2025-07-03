import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SlideSelectorComponent } from './slide-selector.component';
import { byDataQa } from 'src/test-utils/test-helpers';
import { PreviewComponent } from '../preview/preview.component';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ImagePipe } from '../../pipes/image.pipe';

describe('SlideSelectorComponent', () => {
  let component: SlideSelectorComponent;
  let fixture: ComponentFixture<SlideSelectorComponent>;
  let nativeElement: HTMLElement;
  let mockNavigationService;
  const context = describe

  beforeEach(waitForAsync(() => {
    mockNavigationService = {
      goto: vi.fn()
    };

    TestBed.configureTestingModule({
      declarations: [SlideSelectorComponent, PreviewComponent, ImagePipe],
      providers: [
        {provide: NavigationService, useValue: mockNavigationService}
      ]
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
    component.items = [{ name: 'myItem', image: 'url/url' }, { name: 'myItem2', image: 'url/url2' }, { name: 'myItem3', image: 'url/url3' }]
    fixture.detectChanges();

    expect(component.previousItem).to.equal(component.items[0])
    expect(component.currentItem).to.equal(component.items[1])
    expect(component.nextItem).to.equal(component.items[2])
    expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
    expect(nativeElement.querySelector('img[src="url/url2"]')).to.exist;
    expect(nativeElement.querySelector('img[src="url/url3"]')).to.exist;
  });

  it('should not display the fourth item passed in', () => {
    component.items = [{ name: 'myItem', image: 'url/url' }, { name: 'myItem2', image: 'url/url2' }, { name: 'myItem3', image: 'url/url3' }, { name: 'myItem4', image: 'url/url4' }]
    fixture.detectChanges();
    expect(nativeElement.querySelector('img[src="url/url4"]')).not.to.exist;
  });

  context('less than three items', () => {
    it('should show the items', () => {
      component.items = [{ name: 'myItem', image: 'url/url' }, { name: 'myItem2', image: 'url/url2' }]
      fixture.detectChanges();
      expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
      expect(nativeElement.querySelector('img[src="url/url2"]')).to.exist;
    });
  });

  describe('scrolling through items', () => {

    beforeEach(() => {
      component.items = [
        { name: 'myItem', image: 'url/url' },
        { name: 'myItem2', image: 'url/url2' },
        { name: 'myItem3', image: 'url/url3' },
        { name: 'myItem4', image: 'url/url4' },
        { name: 'myItem5', image: 'url/url5' }
      ];
      fixture.detectChanges();
    });

    context('when the next item is clicked', () => {
      it('should scroll such that the next item is shown and the first item is not', () => {
        getElementByDataQa('forward-arrow').click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('img[src="url/url"]')).not.to.exist;
        expect(nativeElement.querySelector('img[src="url/url4"]')).to.exist;
      });

      it('should wrap around and show the first item when it reaches the end', () => {
        getElementByDataQa('forward-arrow').click();
        getElementByDataQa('forward-arrow').click();
        getElementByDataQa('forward-arrow').click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('img[src="url/url4"]')).to.exist;
        expect(nativeElement.querySelector('img[src="url/url5"]')).to.exist;
        expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
      })
    });

    context('when the previous item is clicked', () => {
      it('should scroll such that the previous item is shown and the last item shown is no longer shown', () => {
        component.scrollForward();
        fixture.detectChanges();
        expect(nativeElement.querySelector('img[src="url/url"]')).not.to.exist;
        expect(nativeElement.querySelector('img[src="url/url4"]')).to.exist;

        getElementByDataQa('back-arrow').click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
        expect(nativeElement.querySelector('img[src="url/url4"]')).not.to.exist;
      })

      it('should wrap around to show the last item if it passes the first', () => {
        getElementByDataQa('back-arrow').click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('img[src="url/url3"]')).not.to.exist;
        expect(nativeElement.querySelector('img[src="url/url5"]')).to.exist;
      });
    });
  });

  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  }

});