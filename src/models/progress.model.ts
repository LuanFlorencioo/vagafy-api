import { Checkpoint } from './checkpoint.model';
import { Job } from './job.model';

export class Progress {
  readonly id: number;

  is_finished: boolean;

  status: string;

  updated_at: Date;

  meeting_at: Date;

  job: Job;

  checkpoints: Checkpoint[];
}
