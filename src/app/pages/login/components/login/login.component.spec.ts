import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import * as chai from 'chai';
import { of, throwError } from 'rxjs';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SecurityService } from 'src/app/services/security/security.service';
import { byDataQa } from 'src/test-utils/test-helpers';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let expect;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: SecurityService, useValue: sinon.createStubInstance(SecurityService)},
        {provide: NavigationService, useValue: sinon.createStubInstance(NavigationService)}
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
    (component.securityService.getCurrentUser as sinon.SinonStub).returns(of({user: 'Tim'}))
    fixture.detectChanges();

    expect(component.navigationService.goto).to.have.been.calledWith('');
  });

  describe('if not already logged in', () => {
    beforeEach(() => {
      (component.securityService.getCurrentUser as sinon.SinonStub).returns(of(null))
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
        (component.securityService.login as sinon.SinonStub).returns(of(true));
      });

      it('should exist', () => {
        expect(getElementByDataQa('login-button')).to.exist;
      });

      it('should make a call to the security service login method when clicked with the user and password', () => {
        component.form.controls.username.setValue('Tim');
        component.form.controls.password.setValue('password');

        getElementByDataQa('login-button').click();

        expect(component.securityService.login).to.have.been.calledWith('Tim', 'password');
      });

      it('should not show error messages by default', () => {
        expect(getElementByDataQa('incorrect-login')).not.to.exist;
        expect(getElementByDataQa('failed-login')).not.to.exist;
      });

      describe('login resposne', () => {
        it('should navigate to the landing page if the login was successful', () => {
          (component.securityService.login as sinon.SinonStub).returns(of(true));

          getElementByDataQa('login-button').click();

          expect(component.navigationService.goto).to.have.been.calledWith('');
        });

        it('should show the user/password incorrect message when receiving 401', () => {
          (component.securityService.login as sinon.SinonStub).returns(throwError(new HttpErrorResponse({status: 401, statusText: 'Unauthorized'})));

          getElementByDataQa('login-button').click();
          fixture.detectChanges();

          expect(getElementByDataQa('incorrect-login')).to.exist;
        });
        
        it('should show the generic error message when receiving another sort of error', () => {
          (component.securityService.login as sinon.SinonStub).returns(throwError(new Error()));

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
