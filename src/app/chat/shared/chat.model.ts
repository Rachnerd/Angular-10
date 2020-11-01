export interface ChatMessage {
  content: string;
  user: User;
  createdAt: string;
}

export interface User {
  name: string;
  image: string;
}
