import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from 'src/app/app-routing.module';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
      ]
    });
    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  describe('goto', () => {
    it('should navigate to the page', fakeAsync(() => {
      service.goto('blog');

      tick();
      expect(location.path()).to.equal('/blog')
    }));
  });
});
