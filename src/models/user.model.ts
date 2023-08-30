import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;

  username: string;

  email: string;

  avatar_url?: string;

  is_authenticated: boolean;

  is_disabled: boolean;

  google_id?: string;

  google_email?: string;

  readonly created_at: Date;

  readonly disabled_at?: Date;

  @Exclude({ toClassOnly: true })
  password: string;

  @Exclude({ toClassOnly: true })
  token?: string;
}
