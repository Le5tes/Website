import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'chai';

import { SlideSelectorComponent } from './slide-selector.component';
import { byDataQa } from 'src/test-utils/test-helpers';

describe('SlideSelectorComponent', () => {
  let component: SlideSelectorComponent;
  let fixture: ComponentFixture<SlideSelectorComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlideSelectorComponent]
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
    component.items = [{ name: 'myItem', largeThumbnail: 'url/url' }, { name: 'myItem2', largeThumbnail: 'url/url2' }, { name: 'myItem3', largeThumbnail: 'url/url3' }]
    fixture.detectChanges();
    expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
    expect(nativeElement.querySelector('img[src="url/url2"]')).to.exist;
    expect(nativeElement.querySelector('img[src="url/url3"]')).to.exist;
  });

  it('should not display the fourth item passed in', () => {
    component.items = [{ name: 'myItem', largeThumbnail: 'url/url' }, { name: 'myItem2', largeThumbnail: 'url/url2' }, { name: 'myItem3', largeThumbnail: 'url/url3' }, { name: 'myItem4', largeThumbnail: 'url/url4' }]
    fixture.detectChanges();
    expect(nativeElement.querySelector('img[src="url/url4"]')).not.to.exist;
  });

  context('less than three items', () => {
    it('should show the items', () => {
      component.items = [{ name: 'myItem', largeThumbnail: 'url/url' }, { name: 'myItem2', largeThumbnail: 'url/url2' }]
      fixture.detectChanges();
      expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
      expect(nativeElement.querySelector('img[src="url/url2"]')).to.exist;
    });
  });

  describe('scrolling through items', () => {

    beforeEach(() => {
      component.items = [
        { name: 'myItem', largeThumbnail: 'url/url' },
        { name: 'myItem2', largeThumbnail: 'url/url2' },
        { name: 'myItem3', largeThumbnail: 'url/url3' },
        { name: 'myItem4', largeThumbnail: 'url/url4' },
        { name: 'myItem5', largeThumbnail: 'url/url5' }
      ];
      fixture.detectChanges();
    });

    context('when the next item is clicked', () => {
      it('should scroll such that the next item is shown and the first item is not', () => {
        getElementByDataQa('next-item').click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('img[src="url/url"]')).not.to.exist;
        expect(nativeElement.querySelector('img[src="url/url4"]')).to.exist;
      });

      it('should wrap around and show the first item when it reaches the end', () => {
        getElementByDataQa('next-item').click();
        getElementByDataQa('next-item').click();
        getElementByDataQa('next-item').click();
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

        getElementByDataQa('previous-item').click();
        fixture.detectChanges();

        expect(nativeElement.querySelector('img[src="url/url"]')).to.exist;
        expect(nativeElement.querySelector('img[src="url/url4"]')).not.to.exist;
      })

      it('should wrap around to show the last item if it passes the first', () => {
        getElementByDataQa('previous-item').click();
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