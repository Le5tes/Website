import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { environment } from 'src/environments/environment';

import { SecurityService } from './security.service';

describe('SecurityService', () => {
  let service: SecurityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SecurityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  describe('login', () => {
    beforeEach(() => {
      service.loginUrl = '/url';
    });

    it('should make a call to the blog endpoint to log in', () => {
      service.login('Tim', 'Password').subscribe(() => {})

      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('POST');
        // expect(request.body).to.deep.equal({username: 'Tim', password: 'Password'})
        expect(request.url).to.equal(service.loginUrl);
        return true;
      })
    });
  });
});
