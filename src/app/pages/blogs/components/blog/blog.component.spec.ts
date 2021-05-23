import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'chai';

import { BlogComponent } from './blog.component';
import { byDataQa } from 'src/test-utils/test-helpers';
import { MarkdownModule } from 'ngx-markdown';
import { ImagePipe } from '../../pipes/image.pipe';

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
    expect(nativeElement.querySelector(byDataQa('body')).textContent).to.contain(getBlog().blog);
  });

  const getBlog = () => {
    return {
      username: 'Tim',
      blog: 'BODY',
      createdAt: new Date(2020,0,1)
    }
  }
});
