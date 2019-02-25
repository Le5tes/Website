import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { expect} from 'chai'; 
import { MatToolbarModule } from '@angular/material';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let appComponent :AppComponent;

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
    fixture = TestBed.createComponent(AppComponent);
    nativeElement = fixture.debugElement.nativeElement;
    appComponent = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).to.exist;
  });

  it(`should have as title 'lestes-gaming'`, () => {
    expect(appComponent.title).to.equal('lestes-gaming');
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
