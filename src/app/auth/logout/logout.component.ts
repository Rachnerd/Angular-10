import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ov-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  private logoutSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logoutSubscription = this.authService.isLoggedIn$
      .pipe(filter((isLoggedIn) => !isLoggedIn))
      .subscribe(() => this.router.navigate(['']));

    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }
}
