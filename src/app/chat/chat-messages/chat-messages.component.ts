import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../shared/chat.model';

@Component({
  selector: 'ov-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  @Input()
  messages: ChatMessage[];

  constructor() {}

  ngOnInit(): void {}
}
