import { Injectable } from '@angular/core';
import { ChatMessage } from './chat.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages$: Observable<ChatMessage[]>;
  private messagesSubject: Subject<ChatMessage[]>;

  constructor(private httpClient: HttpClient) {
    this.messagesSubject = new Subject();
    this.messages$ = this.messagesSubject.asObservable();
  }

  getMessages(): void {
    this.httpClient.get('./assets/messages.json').subscribe((data) => {
      this.messagesSubject.next(data as ChatMessage[]);
    });
  }

  sendMessage(message: string): void {
    console.log(`Send message: ${message}`);
  }
}
