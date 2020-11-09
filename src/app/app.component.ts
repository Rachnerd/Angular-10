import { Component, OnInit } from '@angular/core';
import { NavigationMenu } from './ui/navigation/navigation.component';
import { AuthService } from './auth/shared/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const COMMON_MENU: NavigationMenu[] = [
  {
    title: 'Home',
    route: '',
  },
];

const LOGGED_IN_MENU: NavigationMenu[] = [
  ...COMMON_MENU,
  {
    title: 'Chat',
    route: 'chat',
  },
  {
    title: 'Logout',
    route: 'logout',
  },
];

const LOGGED_OUT_MENU: NavigationMenu[] = [
  ...COMMON_MENU,
  {
    title: 'Login',
    route: 'login',
  },
];

@Component({
  selector: 'ov-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  navigationMenu$: Observable<NavigationMenu[]>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.navigationMenu$ = this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => (isLoggedIn ? LOGGED_IN_MENU : LOGGED_OUT_MENU))
    );
  }
}
