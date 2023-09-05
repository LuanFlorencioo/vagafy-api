import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JobsRepository } from './jobs.repository';
import { UsersService } from '../users/users.service';
import { UserValidationService } from 'src/utils/user-validation.service';
import { Job } from 'src/models/job.model';
import { JobsStatsService } from 'src/utils/jobs-stats.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    private jobsRepository: JobsRepository,
    private usersService: UsersService,
    private userValidation: UserValidationService,
    private jobsStatsService: JobsStatsService,
  ) {}

  async createJob(userId: number, jobData: CreateJobDto) {
    await this.isUserNotDisable(userId);
    const job = await this.jobsRepository.create(userId, jobData);

    return plainToClass(Job, job);
  }

  async updateJob(userId: number, jobId: number, jobData: UpdateJobDto) {
    await this.isUserNotDisable(userId);
    await this.findJob(userId, jobId);
    const job = await this.jobsRepository.update(userId, jobId, jobData);

    return plainToClass(Job, job);
  }

  async isUserNotDisable(userId: number) {
    const user = await this.usersService.findUser(userId);
    this.userValidation.isNotDisabled(user.is_disabled, user.disabled_at);
  }

  async getAllJobs(userId: number) {
    await this.isUserNotDisable(userId);
    const jobs = (await this.jobsRepository.getAll(userId)).map((job) =>
      plainToClass(Job, job),
    );

    return jobs;
  }

  async findJob(userId: number, jobId: number) {
    try {
      const job = await this.jobsRepository.findJob(userId, jobId);

      return job;
    } catch {
      throw new NotFoundException('Vaga não encontrado ou não existe');
    }
  }

  async getOneJob(userId: number, jobId: number) {
    await this.isUserNotDisable(userId);
    const job = await this.findJob(userId, jobId);

    return job;
  }

  async getJobsStats(userId: number) {
    await this.isUserNotDisable(userId);
    const jobs = (await this.jobsRepository.getAll(userId)).map((job) =>
      plainToClass(Job, job),
    );
    const stats = this.jobsStatsService.getStats(jobs);

    return stats;
  }

  async deleteJob(userId: number, jobId: number) {
    await this.isUserNotDisable(userId);
    await this.findJob(userId, jobId);
    await this.jobsRepository.delete(userId, jobId);
  }
}
