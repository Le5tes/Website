import { TestBed, ComponentFixture, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from './services/navigation/navigation.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let appComponent: AppComponent;

  beforeEach(waitForAsync(() => {
    const stubBlogs = {
      getBlogs: vi.fn().mockReturnValue(of(getBlogs()))
    };
    const stubSecurity = {
      getCurrentUser: vi.fn().mockReturnValue(of(null))
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
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
        {provide: SecurityService, useValue: stubSecurity},
        {provide: NavigationService, useValue: { goto: vi.fn() }}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(AppComponent);
    nativeElement = fixture.debugElement.nativeElement;
    appComponent = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).to.exist;
  });

  it(`should have as title 'lestes-tech'`, () => {
    expect(appComponent.title).to.equal('lestes-tech');
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
      describe('landing', () => {
        it('should exist', () => {
          expect(getElementByDataQa('landing-header-button')).to.exist;
        });

        it('should navigate to the la ding page', () => {
          getElementByDataQa('landing-header-button').click();
          
          expect(appComponent.navigationService.goto).toHaveBeenCalledWith('');
        });
      })

      describe('blog', () => {
        it('should exist', () => {
          expect(getElementByDataQa('blog-header-button')).to.exist;
        });

        it('should navigate to the blog page', () => {
          getElementByDataQa('blog-header-button').click();
          
          expect(appComponent.navigationService.goto).toHaveBeenCalledWith('blog');
        });
      });

      describe('projects', () => {
        it('should exist', () => {
          expect(getElementByDataQa('projects-header-button')).to.exist;
        });

        it('should navigate to the projects page', () => {
          getElementByDataQa('projects-header-button').click();
          
          expect(appComponent.navigationService.goto).toHaveBeenCalledWith('projects');
        });
      });

      describe('about', () => {
        it('should exist', () => {
          expect(getElementByDataQa('about-header-button')).to.exist;
        });

        it('should navigate to the about page', () => {
          getElementByDataQa('about-header-button').click();
          
          expect(appComponent.navigationService.goto).toHaveBeenCalledWith('about')
        });
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
