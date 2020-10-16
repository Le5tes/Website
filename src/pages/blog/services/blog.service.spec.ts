import { TestBed } from '@angular/core/testing';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;
  let expect;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).to.exist;
  });
});
