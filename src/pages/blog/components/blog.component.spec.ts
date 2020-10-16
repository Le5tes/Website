import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let expect;
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let stubGetBlogs;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    stubGetBlogs = sinon.stub(component.blogService, 'getBlogs');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  context('on init', () => {
    it('should make a call to get the latest blog posts', () => {
      expect(stubGetBlogs).to.have.been.called;
    });
  });
});
