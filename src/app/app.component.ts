import { Component } from '@angular/core';
import { NavigationMenu } from './ui/navigation/navigation.component';

@Component({
  selector: 'ov-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navigationMenu: NavigationMenu[] = [
    {
      title: 'Home',
      route: '',
    },
    {
      title: 'Chat',
      route: 'chat',
    },
  ];
}
