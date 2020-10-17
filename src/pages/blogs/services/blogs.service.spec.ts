import { TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BlogsService } from './blogs.service';

describe('BlogService', () => {
  let service: BlogsService;
  let expect;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BlogsService);
  });

  it('should be created', () => {
    expect(service).to.exist;
  });
});
