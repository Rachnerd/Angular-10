import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    ChatModule,
    HttpClientModule,
    AppRoutingModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
