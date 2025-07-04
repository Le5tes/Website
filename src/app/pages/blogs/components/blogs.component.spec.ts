import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { ImagePipe } from '../pipes/image.pipe';
import { UploadComponent } from './upload/upload.component';
import { ImageService } from '../services/image.service';
import { SlideSelectorModule } from 'src/modules/slide-selector/slide-selector.module';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;
  let nativeElement;
  let stubGetBlogs;
  let stubCurrentUser;
  const context = describe


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsComponent, BlogComponent, CreateBlogComponent, UploadComponent, ImagePipe ],
      imports: [MarkdownModule.forRoot(), ReactiveFormsModule, SlideSelectorModule],
      providers: [
        {provide: BlogsService, useValue: {getBlogs: vi.fn(() => of(getDisorderedBlogs())), postBlog: vi.fn(() => of())}},
        {provide: SecurityService, useValue: {getCurrentUser: vi.fn(() => of(null))}},
        {provide: NavigationService, useValue: {}},
        {provide: ImageService, useValue: {}}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    stubGetBlogs = component.blogsService.getBlogs as Mock;

    stubCurrentUser = component.securityService.getCurrentUser as Mock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  context('on init', () => {
    it('should make a call to get the latest blog posts', () => {
      expect(stubGetBlogs).to.toHaveBeenCalled;
    });
    
    it('should order the blogs by date (most recent first)', () => {
      expect(component.blogs).to.deep.equal(getBlogs());
    });
  });

  describe('display blogs', () => {
    it('should create a preview element for each blog item on the component', () => {
      expect(nativeElement.querySelectorAll(byDataQa('blog-preview')).length).to.equal(3);
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
          stubCurrentUser.mockImplementation(() => of({user: 'Tim'}));
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
                id: 'testId',
                username: 'Tim',
                createdAt: new Date(2020, 0, 1),
                title: 'NEW BLOG',
                description: 'NEW BLOG',
                image: 'url',
                body: 'NEW BLOG TODAY!'
              }

              component.uploadBlog(blog);
            });

            it('should call to the blogs service with the blog', () => {
              expect(component.blogsService.postBlog).toHaveBeenCalledWith(blog);
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
      createdAt: new Date(2020, 0, 9),
      body: 'NEW BLOG!',
      image: 'url/url'
    }, {
      username: 'Tim',
      createdAt: new Date(2020, 0, 1),
      body: 'NEW BLOG!',
      image: 'url/url'
    }, {
      username: 'Tim',
      createdAt: new Date(2019, 11, 19),
      body: 'NEW BLOG!',
      image: 'url/url'
    }]
  }

  const getDisorderedBlogs = () => {
    return [{
      username: 'Tim',
      createdAt: "2020-01-01T00:00:00.000Z",
      body: 'NEW BLOG!',
      image: 'url/url'
    }, {
      username: 'Tim',
      createdAt: "2019-12-19T00:00:00.000Z",
      body: 'NEW BLOG!',
      image: 'url/url'
    }, {
      username: 'Tim',
      createdAt: "2020-01-09T00:00:00.000Z",
      body: 'NEW BLOG!',
      image: 'url/url'
    }]
  }
});
