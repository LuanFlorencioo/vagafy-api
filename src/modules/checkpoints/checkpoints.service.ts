import { Injectable } from '@nestjs/common';
import { CheckpointsRepository } from './checkpoints.repository';
import { JobsService } from '../jobs/jobs.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

@Injectable()
export class CheckpointsService {
  constructor(
    private checkpointsRepository: CheckpointsRepository,
    private jobsService: JobsService,
  ) {}

  async createCheckpoint(
    userId: number,
    jobId: number,
    checkpointData: CreateCheckpointDto,
  ) {
    await this.jobsService.isUserNotDisable(userId);
    const { progress } = await this.jobsService.findJob(userId, jobId);
    const checkpoint = await this.checkpointsRepository.create(
      progress.id,
      checkpointData,
    );

    return checkpoint;
  }

  async getAllCheckpoints(userId: number, jobId: number) {
    await this.jobsService.isUserNotDisable(userId);
    const { progress } = await this.jobsService.findJob(userId, jobId);

    return progress.checkpoints;
  }
}
