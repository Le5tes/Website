import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogComponent } from './blog.component';
import { byDataQa } from 'src/test-utils/test-helpers';
import { MarkdownModule } from 'ngx-markdown';
import { ImagePipe } from '../../pipes/image.pipe';
import { Blog } from '../../models/blog.model';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let nativeElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent, ImagePipe ],
      imports: [MarkdownModule.forRoot()], 
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
    expect(nativeElement.querySelector(byDataQa('body')).textContent).to.contain(getBlog().body);
  });

  const getBlog = () => {
    return {
      username: 'Tim',
      body: 'BODY',
      createdAt: new Date(2020,0,1)
    } as Blog;
  }
});
