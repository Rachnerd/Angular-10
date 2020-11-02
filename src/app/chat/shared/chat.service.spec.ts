import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import createSpy = jasmine.createSpy;
import { of, throwError } from 'rxjs';

describe('ChatService', () => {
  let service: ChatService;

  const httpClientMock: Partial<HttpClient> = {
    get: jasmine.createSpy(),
  };

  const MESSAGES: ChatMessage[] = [
    {
      content: 'content',
      user: {
        name: 'name',
        image: 'image',
      },
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
    service = TestBed.inject(ChatService);
  });

  it('should emit messages after a successful request', (done) => {
    httpClientMock.get = createSpy().and.returnValue(of(MESSAGES));

    service.messages$.subscribe((messages) => {
      expect(messages).toEqual(MESSAGES);
      done();
    });

    service.getMessages();
  });

  it('should emit an error after a unsuccessful request', (done) => {
    const ERROR = new Error();
    httpClientMock.get = createSpy().and.returnValue(throwError(ERROR));

    service.error$.subscribe((error) => {
      expect(error).toEqual(ERROR);
      done();
    });

    service.getMessages();
  });
});
