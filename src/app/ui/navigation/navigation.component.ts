import { Component, Input, OnInit } from '@angular/core';

export interface NavigationMenu {
  title: string;
  route: string;
}

@Component({
  selector: 'ov-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input()
  menu: NavigationMenu[];

  constructor() {}

  ngOnInit(): void {}
}
