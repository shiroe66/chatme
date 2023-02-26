import type { User } from '@/models/user/entities/user.entity';

export interface UserSession {
  token: string;
  expires: number;
  user: User;
}
