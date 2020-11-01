import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type Icon = 'play';

@Component({
  selector: 'ov-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() icon: Icon | undefined;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}
}
