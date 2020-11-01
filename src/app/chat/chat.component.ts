import { Component, OnInit } from '@angular/core';
import { ChatMessage } from './shared/chat.model';
import { ChatService } from './shared/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ov-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages$: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages$ = this.chatService.messages$;
    setTimeout(() => {
      this.chatService.getMessages();
    });
  }

  sendMessage(content: string): void {
    this.chatService.sendMessage(content);
  }
}
