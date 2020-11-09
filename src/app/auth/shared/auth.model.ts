import { InjectionToken } from '@angular/core';

interface BaseUser {
  username: string;
}

export interface LoggedInUser extends BaseUser {
  type: 'LoggedIn';
  token: string;
  image: string;
}

export interface AnonymousUser extends BaseUser {
  type: 'Anonymous';
}

export type User = AnonymousUser | LoggedInUser;

export const STORAGE = new InjectionToken('Storage');
