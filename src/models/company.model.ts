import { Job } from './job.model';

export class Company {
  readonly id: number;

  name: string;

  linkedin: string;

  website: string;

  logo_url: string;

  job: Job;
}
