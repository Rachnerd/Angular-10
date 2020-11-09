import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { Route, RouterModule } from '@angular/router';
import { STORAGE } from './shared/auth.model';
import { TokenInterceptor } from './shared/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {
  static forRoot(storage: Storage): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: STORAGE,
          useValue: storage,
        },
      ],
    };
  }
}
