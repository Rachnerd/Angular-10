import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from './shared/chat.model';
import { ChatService } from './shared/chat.service';
import { Observable, Subscription } from 'rxjs';
import { NavigationMenu } from '../ui/navigation/navigation.component';

@Component({
  selector: 'ov-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<ChatMessage[]>;

  navigation: NavigationMenu[] = [
    {
      route: './',
      title: 'Channel',
    },
    {
      route: './user',
      title: 'User',
    },
  ];

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
