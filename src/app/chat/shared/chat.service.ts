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

  error$: Observable<Error>;
  private errorSubject: Subject<Error>;

  constructor(private httpClient: HttpClient) {
    this.messagesSubject = new Subject();
    this.messages$ = this.messagesSubject.asObservable();

    this.errorSubject = new Subject();
    this.error$ = this.errorSubject.asObservable();
  }

  getMessages(): void {
    this.httpClient.get('./assets/messages.json').subscribe(
      (data) => this.messagesSubject.next(data as ChatMessage[]),
      (error) => this.errorSubject.next(error)
    );
  }

  sendMessage(message: string): void {
    console.log(`Send message: ${message}`);
  }
}
