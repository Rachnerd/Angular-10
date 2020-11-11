import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { ChatService } from './shared/chat.service';
import { Subject } from 'rxjs';
import { ChatModule } from './chat.module';
import { ChatMessage } from './shared/chat.model';
import createSpy = jasmine.createSpy;
import { RouterModule } from '@angular/router';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceMock: Partial<ChatService>;

  beforeEach(async () => {
    chatServiceMock = {
      messages$: new Subject(),
      error$: new Subject(),
      sendMessage: createSpy(),
      getMessages: createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ChatModule],
      providers: [
        {
          provide: ChatService,
          useValue: chatServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve chat messages on init', () => {
    expect(chatServiceMock.getMessages).toHaveBeenCalledTimes(1);
  });

  it('should render messages', () => {
    const MESSAGES_MOCK: ChatMessage[] = [
      {
        createdAt: new Date().toISOString(),
        content: 'content',
        user: {
          username: 'name',
          image: 'image',
        },
      },
    ];

    (chatServiceMock.messages$ as Subject<ChatMessage[]>).next(MESSAGES_MOCK);
    fixture.detectChanges();

    const {
      content,
      user: { username, image },
    } = MESSAGES_MOCK[0];

    const compiled: HTMLElement = fixture.nativeElement;

    expect(
      compiled.querySelector('.chat-messages .content').textContent
    ).toContain(content);

    expect(
      compiled.querySelector('.chat-messages .content').textContent
    ).toContain(username);

    expect(
      compiled
        .querySelector('.chat-messages .profile-image')
        .getAttribute('src')
    ).toContain(image);
  });

  it('should send a chat message', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const input = compiled.querySelector<HTMLInputElement>(
      '.chat-form .ui-input'
    );
    const button = compiled.querySelector<HTMLButtonElement>(
      '.chat-form .ui-button'
    );

    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    button.click();

    fixture.detectChanges();

    expect(chatServiceMock.sendMessage).toHaveBeenCalledTimes(1);
    expect(chatServiceMock.sendMessage).toHaveBeenCalledWith('test');
  });

  it('should log if messages failed to retrieve', () => {
    const errorSpy = spyOn(console, 'error');

    (chatServiceMock.error$ as Subject<Error>).next(new Error());

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
