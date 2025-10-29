import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_cQ400Klmr',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: '4up9321ung8n78se24t6940oes',
      scope: 'phone openid email',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule {}
