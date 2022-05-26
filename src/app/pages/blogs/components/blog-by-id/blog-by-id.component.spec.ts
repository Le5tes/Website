import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { of } from 'rxjs';
import { BlogsService } from '../../services/blogs.service';

import { BlogByIdComponent } from './blog-by-id.component';

describe('BlogByIdComponent', () => {
  let expect;
  let component: BlogByIdComponent;
  let fixture: ComponentFixture<BlogByIdComponent>;
  let mockRoute;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  })

  beforeEach(async () => {
    mockRoute = {params: of({blogId: 'testId'})};


    await TestBed.configureTestingModule({
      declarations: [ BlogByIdComponent ],
      providers: [
        {provide: BlogsService, useValue: sinon.createStubInstance(BlogsService)},
        {provide: ActivatedRoute, useValue: mockRoute}
      ]
    })
    .compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(BlogByIdComponent);
    component = fixture.componentInstance;
    (component.blogsService.getBlogById as sinon.Stub).returns(of({}));

    fixture.detectChanges();
    tick();

  }));

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should make a call to get the blog by id based on the route param', () => {
    expect(component.blogsService.getBlogById).to.have.been.calledWith('testId');
  });
});
