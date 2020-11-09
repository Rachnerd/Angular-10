import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../shared/auth.model';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ov-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$
      .pipe(filter((isLoggedIn) => isLoggedIn))
      .subscribe(() => this.router.navigate(['']));
  }

  login(): void {
    this.authService.login();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
