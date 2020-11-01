import { Injectable } from '@angular/core';
import { ChatMessage } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  getMessages(): ChatMessage[] {
    return [
      {
        user: {
          image: '',
          name: '',
        },
        content: 'Hello world',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  sendMessage(message: string): void {
    // Do something
    console.log(`Send message: ${message}`);
  }
}
