import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { byDataQa } from '../../../test-utils/test-helpers';

import { BlogsComponent } from './blogs.component';
import { of } from 'rxjs';
import { BlogsService } from '../services/blogs.service';

describe('BlogsComponent', () => {
  let expect;
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;
  let nativeElement;
  let stubGetBlogs;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsComponent ],
      providers: [{provide: BlogsService, useValue: sinon.createStubInstance(BlogsService)}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    stubGetBlogs = component.blogsService.getBlogs as sinon.SinonStub;
    stubGetBlogs.returns(of(getBlogs()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  context('on init', () => {
    it('should make a call to get the latest blog posts', () => {
      expect(stubGetBlogs).to.have.been.called;
      expect(component.blogs).to.deep.equal(getBlogs());
    });
  });

  describe('display blogs', () => {
    it('should create a blog element for each blog item on the component', () => {
      expect(nativeElement.querySelectorAll(byDataQa('blog')).length).to.equal(2);
    });
  });

  const getBlogs = () => {
    return [{
      username: 'Tim',
      createdAt: new Date(2020, 0, 1),
      body: 'NEW BLOG!'
    }, {
      username: 'Tim',
      createdAt: new Date(2020, 0, 9),
      body: 'NEW BLOG!'
    }]
  }
});
