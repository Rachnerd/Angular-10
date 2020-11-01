import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ov-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {
  message = '';

  constructor() {}

  ngOnInit(): void {}

  setMessage(text: string): void {
    this.message = text;
  }

  submit(): void {
    alert(`Message: ${this.message.trim()}`);
  }
}
