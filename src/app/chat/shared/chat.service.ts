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
          image: 'https://www.flaticon.com/svg/static/icons/svg/64/64572.svg',
          name: 'User1',
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
