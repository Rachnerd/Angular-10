import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesComponent } from './chat-messages.component';
import { UiModule } from '../../ui/ui.module';

describe('ChatMessagesComponent', () => {
  let component: ChatMessagesComponent;
  let fixture: ComponentFixture<ChatMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatMessagesComponent],
      imports: [UiModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
