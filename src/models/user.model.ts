import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;

  username: string;

  email: string;

  avatar_url?: string;

  is_disabled: boolean;

  is_authenticated: boolean;

  readonly created_at: Date;

  readonly disabled_at?: Date;

  @Exclude({ toClassOnly: true })
  password: string;

  @Exclude({ toClassOnly: true })
  token?: string;

  @Exclude({ toClassOnly: true })
  google_id?: string;

  @Exclude({ toClassOnly: true })
  google_email?: string;
}
