import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { BlogComponent } from './blog.component';
import { byDataQa } from 'src/test-utils/test-helpers';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    component.blog = getBlog();
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should show the body with the value passed in', () => {
    expect(nativeElement.querySelector(byDataQa('body')).textContent).to.equal(getBlog().body);
  });

  const getBlog = () => {
    return {
      username: 'Tim',
      body: 'BODY',
      createdAt: new Date(2020,0,1)
    }
  }
});
