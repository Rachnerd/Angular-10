import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatSidebarComponent } from './chat/chat-sidebar/chat-sidebar.component';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { ChatChannelComponent } from './chat/chat-channel/chat-channel.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatSidebarComponent,
    ChatMessagesComponent,
    ChatFormComponent,
    ChatChannelComponent,
    ChatComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
