import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BlogsService } from '../../services/blogs.service';

import { BlogByIdComponent } from './blog-by-id.component';
import { BlogComponent } from '../blog/blog.component';
import { ImagePipeModule } from 'src/modules/image-pipe/image-pipe.module';

describe('BlogByIdComponent', () => {
  let component: BlogByIdComponent;
  let fixture: ComponentFixture<BlogByIdComponent>;
  let mockRoute;
  let mockBlogsService;

  beforeEach(async () => {
    mockRoute = {params: of({blogId: 'testId'})};
    mockBlogsService = {
      getBlogById: vi.fn().mockReturnValue(of({}))
    };


    await TestBed.configureTestingModule({
      declarations: [ BlogByIdComponent, BlogComponent ],
      imports: [ImagePipeModule],
      providers: [
        {provide: BlogsService, useValue: mockBlogsService},
        {provide: ActivatedRoute, useValue: mockRoute}
      ]
    })
    .compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(BlogByIdComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    tick();

  }));

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should make a call to get the blog by id based on the route param', () => {
    expect(mockBlogsService.getBlogById).toHaveBeenCalledWith('testId');
  });
});
