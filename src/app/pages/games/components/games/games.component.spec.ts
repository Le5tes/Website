import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'chai';

import { GamesComponent } from './games.component';
import { byDataQa } from 'src/test-utils/test-helpers';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let nativeElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesComponent ],
      imports: [ SlideSelectorModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  describe('browser games section', () => {
    it('should exist', () => {
      expect(getElementByDataQa('browser-games-selector')).to.exist;
    });
  });

  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  };
});
