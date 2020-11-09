import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnonymousUser, LoggedInUser, STORAGE, User } from './auth.model';
import { filter, first, map, shareReplay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const ANONYMOUS_USER: AnonymousUser = {
  type: 'Anonymous',
  username: 'Stranger',
};

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  private userSubject: BehaviorSubject<User>;

  constructor(
    private httpClient: HttpClient,
    @Optional() @Inject(STORAGE) private storage: Storage | null
  ) {
    const persistedUser = this.getPersistedUser();
    this.userSubject = new BehaviorSubject<User>(persistedUser);
    this.user$ = this.userSubject.asObservable();

    this.isLoggedIn$ = this.user$.pipe(
      map((currentUser) => currentUser.type !== 'Anonymous')
    );

    if (storage) {
      this.user$.subscribe((user) =>
        this.storage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      );
    }
  }

  getUser(): User {
    return this.userSubject.getValue();
  }

  login(): void {
    this.httpClient
      .get('assets/user.json')
      .subscribe((user: LoggedInUser) => this.userSubject.next(user));
  }

  logout(): void {
    setTimeout(() => {
      this.userSubject.next(ANONYMOUS_USER);
    }, 500);
  }

  private getPersistedUser(): User {
    return this.storage
      ? JSON.parse(this.storage.getItem(USER_STORAGE_KEY)) || ANONYMOUS_USER
      : ANONYMOUS_USER;
  }
}
