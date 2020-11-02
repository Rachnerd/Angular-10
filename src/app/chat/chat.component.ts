import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from './shared/chat.model';
import { ChatService } from './shared/chat.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ov-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<ChatMessage[]>;

  private errorSubscription: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages$ = this.chatService.messages$;
    this.errorSubscription = this.chatService.error$.subscribe((error) =>
      console.error('Failed to fetch messages!')
    );

    this.chatService.getMessages();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  sendMessage(content: string): void {
    this.chatService.sendMessage(content);
  }
}
