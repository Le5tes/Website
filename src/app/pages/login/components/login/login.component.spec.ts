import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SecurityService } from 'src/app/services/security/security.service';
import { byDataQa } from 'src/test-utils/test-helpers';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockSecurityService;
  let mockNavigationService;

  beforeEach(async () => {
    mockSecurityService = {
      getCurrentUser: vi.fn(),
      login: vi.fn()
    };
    mockNavigationService = {
      goto: vi.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: SecurityService, useValue: mockSecurityService},
        {provide: NavigationService, useValue: mockNavigationService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should redirect if use already logged in', () => {
    mockSecurityService.getCurrentUser.mockReturnValue(of({user: 'Tim'}));
    fixture.detectChanges();

    expect(mockNavigationService.goto).toHaveBeenCalledWith('');
  });

  describe('if not already logged in', () => {
    beforeEach(() => {
      mockSecurityService.getCurrentUser.mockReturnValue(of(null));
      fixture.detectChanges();
    });

    describe('details', () => {
      it('should have a box to enter username', () => {
        expect(getElementByDataQa('user-box')).to.exist;
      });

      it('should have a box to enter password', () => {
        expect(getElementByDataQa('password-box')).to.exist;
      });
    });
    
    describe('login button', () => {
      beforeEach(() => {
        mockSecurityService.login.mockReturnValue(of(true));
      });

      it('should exist', () => {
        expect(getElementByDataQa('login-button')).to.exist;
      });

      it('should make a call to the security service login method when clicked with the user and password', () => {
        component.form.controls.username.setValue('Tim');
        component.form.controls.password.setValue('password');

        getElementByDataQa('login-button').click();

        expect(mockSecurityService.login).toHaveBeenCalledWith('Tim', 'password');
      });

      it('should not show error messages by default', () => {
        expect(getElementByDataQa('incorrect-login')).not.to.exist;
        expect(getElementByDataQa('failed-login')).not.to.exist;
      });

      describe('login resposne', () => {
        it('should navigate to the landing page if the login was successful', () => {
          mockSecurityService.login.mockReturnValue(of(true));

          getElementByDataQa('login-button').click();

          expect(mockNavigationService.goto).toHaveBeenCalledWith('');
        });

        it('should show the user/password incorrect message when receiving 401', () => {
          mockSecurityService.login.mockReturnValue(throwError(new HttpErrorResponse({status: 401, statusText: 'Unauthorized'})));

          getElementByDataQa('login-button').click();
          fixture.detectChanges();

          expect(getElementByDataQa('incorrect-login')).to.exist;
        });
        
        it('should show the generic error message when receiving another sort of error', () => {
          mockSecurityService.login.mockReturnValue(throwError(new Error()));

          getElementByDataQa('login-button').click();
          fixture.detectChanges();

          expect(getElementByDataQa('failed-login')).to.exist;
        });
      });
    });
  });

  const getElementByDataQa = (dataQa: string) => {
    return fixture.nativeElement.querySelector(byDataQa(dataQa)) as any;
  };
});
