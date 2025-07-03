import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BlogsService } from './blogs.service';
import { HttpRequest } from '@angular/common/http';

describe('BlogService', () => {
  let service: BlogsService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BlogsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service.getBlogsUrl = 'url';
  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  describe('getBlogs', () => {
    it('should make a call to retrieve the blogs', () => {
      let blogs;
      const expected = [{username: 'Tim', body: 'BLOGBLOG'}, {username: 'Tim', body: 'PLOGPLOG'}];
      service.getBlogs().subscribe((res) => {
        blogs = res;
      });

      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('GET');
        expect(request.url).to.equal(service.getBlogsUrl);
        expect(request.params.get('limit')).to.equal(10);
        return true;
      }).flush(expected);

      expect(blogs).to.equal(expected);
    });
  });

  describe('postBlog', () => {
    it('should make a call with blog object passed in', () => {
      service.postBlog({username: 'Tim', body: 'a blog!'}).subscribe(() => {});

      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('POST');
        expect(request.url).to.equal(service.getBlogsUrl);
        return true;
      });
    });
  });
});
