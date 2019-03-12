import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module'; 
import { expect} from 'chai'; 
import { MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let appComponent: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
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

  it(`should have as title 'lestes-gaming'`, () => {
    expect(appComponent.title).to.equal('lestes-gaming');
  });

  it('should route to the landing page by default', () => {
    expect(location.path()).to.equal('/');
  });

  describe('menu', () => {
    it('should exist', () => {
      expect(nativeElement.querySelector('[data-qa="main-menu"]')).to.exist;
    })
    
    it('should render title in a h1 tag', () => {
      fixture.detectChanges();
      expect(nativeElement.querySelector('h1').textContent).to.contain('Welcome to lestes-gaming!');
    });
  });
});
