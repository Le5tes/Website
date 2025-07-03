import { HttpRequest, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    
    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service.uploadUrl = "aUrl";
  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  describe('upload', () => {
    it('should make a call to get an upload url, then a put to that url with the file', () => {
      const signedUrl = 'http://image.url'
      const expected = {url: signedUrl}
      const file = {name: 'myfile.jpeg',file: 'a file!'}

      service.upload(file).subscribe(() => {})

      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('GET');
        expect(request.url).to.equal(service.uploadUrl +'/myfile.jpeg');
        return true;
      }).flush(expected);

      httpTestingController.expectOne((request: HttpRequest<{}>) => {
        expect(request.method).to.equals('PUT');
        expect(request.url).to.equal(signedUrl);
        expect(request.body).to.equal(file);
        return true;
      });
    });
  });
});
