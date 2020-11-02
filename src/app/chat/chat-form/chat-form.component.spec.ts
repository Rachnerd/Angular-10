import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFormComponent } from './chat-form.component';
import { UiModule } from '../../ui/ui.module';

describe('ChatFormComponent', () => {
  let component: ChatFormComponent;
  let fixture: ComponentFixture<ChatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatFormComponent],
      imports: [UiModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
