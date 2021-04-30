import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module'; 
import { expect} from 'chai'; 
import * as sinon from 'sinon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { byDataQa } from '../test-utils/test-helpers';
import { GamesModule } from './pages/games/games.module';
import { LandingModule } from './pages/landing/landing.module';
import { AboutModule } from './pages/about/about.module';
import { SlideSelectorModule } from '../modules/slide-selector/slide-selector.module';
import { BlogsService } from './pages/blogs/services/blogs.service';
import { SecurityService } from './services/security/security.service';
import { BlogsModule } from './pages/blogs/blogs.module';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let appComponent: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    const stubBlogs = sinon.createStubInstance(BlogsService);
    stubBlogs.getBlogs.returns(of(getBlogs()));
    const stubSecurity = sinon.createStubInstance(SecurityService);
    stubSecurity.getCurrentUser.returns(of(null));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        MatToolbarModule,
        GamesModule,
        BlogsModule,
        LandingModule,
        SlideSelectorModule,
        AboutModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: BlogsService, useValue: stubBlogs},
        {provide: SecurityService, useValue: stubSecurity}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    
    fixture = TestBed.createComponent(AppComponent);
    nativeElement = fixture.debugElement.nativeElement;
    appComponent = fixture.debugElement.componentInstance;
    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(appComponent).to.exist;
  });

  it(`should have as title 'lestes-tech'`, () => {
    expect(appComponent.title).to.equal('lestes-tech');
  });

  it('should route to the landing page by default', () => {
    expect(location.path()).to.equal('/');
  });

  describe('menu', () => {
    it('should exist', () => {
      expect(getElementByDataQa('main-menu')).to.exist;
    });
    
    it('should render title in a h1 tag', () => {
      fixture.detectChanges();
      expect(getElementByDataQa('title').textContent).to.contain('Welcome to lestes-tech!');
    });

    describe('navigation buttons', () => {
      // describe('games', () => {
      //   it('should exist', () => {
      //     expect(getElementByDataQa('games-header-button')).to.exist;
      //   });

      //   it('should navigate to the games page', fakeAsync(() => {
      //     getElementByDataQa('games-header-button').click();
      //     tick()
          
      //     expect(location.path()).to.equal('/games')
      //   }));
      // });
      describe('blog', () => {
        it('should exist', () => {
          expect(getElementByDataQa('blog-header-button')).to.exist;
        });

        it('should navigate to the blog page', fakeAsync(() => {
          getElementByDataQa('blog-header-button').click();
          tick()
          
          expect(location.path()).to.equal('/blog')
        }));
      });

      describe('about', () => {
        it('should exist', () => {
          expect(getElementByDataQa('about-header-button')).to.exist;
        });

        it('should navigate to the games page', fakeAsync(() => {
          getElementByDataQa('about-header-button').click();
          tick()
          
          expect(location.path()).to.equal('/about')
        }));
      });
    });
  });

  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  }

  const getBlogs = () => {
    return [{
      username: 'Tim',
      createdAt: new Date(2020, 0, 1),
      body: 'NEW BLOG!'
    }, {
      username: 'Tim',
      createdAt: new Date(2020, 0, 9),
      body: 'NEW BLOG!'
    }]
  }
});
