import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [SidebarComponent, ButtonComponent, InputComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, ButtonComponent, InputComponent],
})
export class UiModule {}
