import { Progress } from './progress.model';

export class Checkpoint {
  readonly id: number;

  title: string;

  description: string;

  created_at: Date;

  progress: Progress;
}
