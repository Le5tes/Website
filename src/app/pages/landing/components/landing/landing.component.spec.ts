import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {expect} from 'chai';

import { LandingComponent } from './landing.component';
import { asNativeElements } from '@angular/core';
import { byDataQa } from 'src/test-utils/test-helpers';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      imports: [SlideSelectorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  describe('games slide-selector', () => {
    it('should exist', () => {
      expect(getElementByDataQa('games-slide-selector')).to.exist;
    });
  });

  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  };
});
