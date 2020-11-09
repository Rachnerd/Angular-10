import { LoggedInUser } from '../../auth/shared/auth.model';

export interface ChatMessage {
  content: string;
  user: Omit<LoggedInUser, 'token' | 'type'>;
  createdAt: string;
}
