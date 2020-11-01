import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ov-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {
  @Output()
  send = new EventEmitter<string>();

  message = '';

  constructor() {}

  ngOnInit(): void {}

  setMessage(text: string): void {
    this.message = text;
  }

  submit(): void {
    this.send.emit(this.message);
  }
}
