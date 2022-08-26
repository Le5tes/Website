import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {expect} from 'chai';

import { LandingComponent } from './landing.component';
import { asNativeElements } from '@angular/core';
import * as sinon from 'sinon';
import { byDataQa } from 'src/test-utils/test-helpers';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';
import { BlogsService } from 'src/app/pages/blogs/services/blogs.service';
import { of } from 'rxjs';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let nativeElement: HTMLElement;
  let stubGetBlogs;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      imports: [SlideSelectorModule],
      providers: [{provide: BlogsService, useValue: sinon.createStubInstance(BlogsService)},]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    stubGetBlogs = component.blogsService.getBlogs as sinon.SinonStub;
    stubGetBlogs.returns(of([]));
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  // describe('blogs slide-selector', () => {
  //   it('should exist', () => {
  //     expect(getElementByDataQa('blogs-slide-selector')).to.exist;
  //   });
  // });

  // describe('games slide-selector', () => {
  //   it('should exist', () => {
  //     expect(getElementByDataQa('games-slide-selector')).to.exist;
  //   });
  // });

  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  };
});
