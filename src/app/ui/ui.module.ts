import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent,
    ButtonComponent,
    InputComponent,
    NavigationComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarComponent,
    ButtonComponent,
    InputComponent,
    NavigationComponent,
  ],
})
export class UiModule {}
