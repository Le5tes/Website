import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { byDataQa } from '../../../../test-utils/test-helpers';

import { BlogsComponent } from './blogs.component';
import { of } from 'rxjs';
import { BlogsService } from '../services/blogs.service';
import { BlogComponent } from './blog/blog.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { SecurityService } from 'src/app/services/security/security.service';
import { Blog } from '../models/blog.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('BlogsComponent', () => {
  let expect;
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;
  let nativeElement;
  let stubGetBlogs;
  let stubCurrentUser;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsComponent, BlogComponent, CreateBlogComponent ],
      imports: [MarkdownModule.forRoot(), ReactiveFormsModule],
      providers: [
        {provide: BlogsService, useValue: sinon.createStubInstance(BlogsService)},
        {provide: SecurityService, useValue: sinon.createStubInstance(SecurityService)}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    stubGetBlogs = component.blogsService.getBlogs as sinon.SinonStub;
    stubGetBlogs.returns(of(getBlogs()));
    stubCurrentUser = component.securityService.getCurrentUser as sinon.SinonStub;
    stubCurrentUser.returns(of(null));
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

  context('creating blogs', () => {
    describe('create blog button', () => {
      let createBlogButton;
      beforeEach(() => {
        createBlogButton = () => nativeElement.querySelector(byDataQa('create-blog-button'));
      });

      it('shouldn\'t exist if not logged in', () => {
        expect(createBlogButton()).not.to.exist;
      });

      context('when logged in', () => {
        beforeEach(waitForAsync(() => {
          stubCurrentUser.returns(of({user: 'Tim'}));
          component.ngOnInit();
          fixture.detectChanges();
        }));

        it('should exist', () => {
          expect(createBlogButton()).to.exist;
        });
        
        context('on click', () => {
          beforeEach(() => {
            createBlogButton().click();
            fixture.detectChanges();
          });
          
          it('should open the create blog component', () => {
            expect(nativeElement.querySelector(byDataQa('create-blog'))).to.exist;
          });
          
          it('should hide the other blogs', () => {
            expect(nativeElement.querySelector(byDataQa('blogs'))).not.to.exist;
          });
          
          it('should be hidden when clicked', () => {
            expect(createBlogButton()).not.to.exist;
          });

          context('when it emits the create blog signal', () => {
            let blog : Blog;

            beforeEach(() => {
              blog = {
                username: 'Tim',
                createdAt: new Date(2020, 0, 1),
                blog: 'NEW BLOG TODAY!'
              }

              component.uploadBlog(blog);
            });

            it('should call to the blogs service with the blog', () => {
              expect(component.blogsService.postBlog).to.have.been.calledWith(blog);
            });
          });

          context('when it emits the close signal', () => {
            beforeEach(() => {
              component.stopCreatingBlog();
              fixture.detectChanges();
            });

            it('should close the create blog component', () => {
              expect(nativeElement.querySelector(byDataQa('create-blog'))).not.to.exist;
            });
            
            it('should show the other blogs', () => {
              expect(nativeElement.querySelector(byDataQa('blogs'))).to.exist;
            });
            
            it('should be hidden when clicked', () => {
              expect(createBlogButton()).to.exist;
            });
          });
        });
      });
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
