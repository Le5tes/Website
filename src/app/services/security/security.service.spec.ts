import { HttpRequest, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { SecurityService } from './security.service';

describe('SecurityService', () => {
  let service: SecurityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
        expect(request.body).to.deep.equal({username: 'Tim', password: 'Password'})
        expect(request.url).to.equal(service.loginUrl);
        return true;
      });
    });
  });

  describe('getCurrentUser', () => {
    beforeEach(() => {
      service.currentUserUrl = '/url';
    });

    it('should make a call to the blog endpoint get the user', () => {
      let result
      service.getCurrentUser().subscribe((res) => result = res);


      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('GET');
        expect(request.url).to.equal(service.currentUserUrl);
        return true;
      }).flush({ user: 'Tim' });

      expect(result).to.deep.equal({ user: 'Tim' });
    });

    it('should make a call to the blog endpoint get the user', () => {
      let result;
      service.getCurrentUser().subscribe((res) => result = res);

      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('GET');
        expect(request.url).to.equal(service.currentUserUrl);
        return true;
      }).flush('Error', {status: 401, statusText: 'Unauthorised'});

      expect(result).to.be.null;
    });
  });
});
