import { Injectable } from '@angular/core';
import { ChatMessage } from './chat.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages$: Observable<ChatMessage[]>;
  private messagesSubject: Subject<ChatMessage[]>;

  constructor() {
    this.messagesSubject = new Subject();
    this.messages$ = this.messagesSubject.asObservable();
  }

  getMessages(): void {
    this.messagesSubject.next([
      {
        user: {
          image: 'https://www.flaticon.com/svg/static/icons/svg/64/64572.svg',
          name: 'User1',
        },
        content: 'Hello world',
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  sendMessage(message: string): void {
    // Do something
    console.log(`Send message: ${message}`);
  }
}
