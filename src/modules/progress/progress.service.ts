import { Injectable } from '@nestjs/common';
import { ProgressRepository } from './progress.repository';
import { JobsService } from '../jobs/jobs.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    private progressRepository: ProgressRepository,
    private jobsService: JobsService,
  ) {}

  async updateProgress(
    userId: number,
    jobId: number,
    progressData: UpdateProgressDto,
  ) {
    await this.jobsService.isUserNotDisable(userId);
    await this.jobsService.findJob(userId, jobId);
    const progress = await this.progressRepository.update(jobId, progressData);

    return progress;
  }

  async getProgress(userId: number, jobId: number) {
    await this.jobsService.isUserNotDisable(userId);
    const { progress } = await this.jobsService.findJob(userId, jobId);

    return progress;
  }
}
