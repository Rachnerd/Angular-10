import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatChannelComponent } from './chat-channel/chat-channel.component';
import { ChatComponent } from './chat.component';
import { UiModule } from '../ui/ui.module';
import { Route, RouterModule } from '@angular/router';
import { LoggedInGuard } from '../auth/shared/logged-in.guard';
import { ChatUserComponent } from './chat-user/chat-user.component';

const CHAT_ROUTES: Route[] = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        component: ChatChannelComponent,
      },
      {
        path: 'user',
        component: ChatUserComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ChatMessagesComponent,
    ChatFormComponent,
    ChatChannelComponent,
    ChatComponent,
    ChatUserComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(CHAT_ROUTES), UiModule],
  exports: [],
})
export class ChatModule {}
