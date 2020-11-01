import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatChannelComponent } from './chat-channel/chat-channel.component';
import { ChatComponent } from './chat.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    ChatMessagesComponent,
    ChatFormComponent,
    ChatChannelComponent,
    ChatComponent,
  ],
  imports: [CommonModule, UiModule],
  exports: [ChatComponent],
})
export class ChatModule {}
