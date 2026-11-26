import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockSecurityService;
  let mockNavigationService;

  beforeEach(async () => {
    mockSecurityService = {
      checkAuth: vi.fn(),
      authorize: vi.fn()
    };
    mockNavigationService = {
      goto: vi.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: OidcSecurityService, useValue: mockSecurityService},
        {provide: NavigationService, useValue: mockNavigationService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should go to the blog page if already authenticated', () => {
    mockSecurityService.checkAuth.mockReturnValue(of({isAuthenticated: true}));
    fixture.detectChanges();

    expect(mockNavigationService.goto).toHaveBeenCalledWith('blog');
    expect(mockSecurityService.authorize).not.toHaveBeenCalled();
  });

  it('should redirect to the identity provider if not authenticated', () => {
    mockSecurityService.checkAuth.mockReturnValue(of({isAuthenticated: false}));
    fixture.detectChanges();

    expect(mockSecurityService.authorize).toHaveBeenCalled();
    expect(mockNavigationService.goto).not.toHaveBeenCalled();
  });
});
