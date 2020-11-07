import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
