import { Company } from './company.model';
import { Progress } from './progress.model';
import { Recruiter } from './recruiter.model';
import { User } from './user.model';

export class Job {
  readonly id: number;

  title: string;

  description?: string;

  link: string;

  user: User;

  company: Company;

  recruiter?: Recruiter;

  progress: Progress;

  readonly created_at: Date;
}
