import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { JobsService } from '../jobs/jobs.service';
import { RecruitersRepository } from './recruiters.repository';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Injectable()
export class RecruitersService {
  constructor(
    private recruitersRepository: RecruitersRepository,
    private jobsService: JobsService,
  ) {}

  async createRecruiter(
    userId: number,
    jobId: number,
    recruiterData: CreateRecruiterDto,
  ) {
    await this.jobsService.isUserNotDisable(userId);
    const job = await this.jobsService.findJob(userId, jobId);
    if (job.recruiter) {
      throw new ForbiddenException('Esta vaga já existe um recrutador');
    }

    const recruiter = await this.recruitersRepository.create(
      jobId,
      recruiterData,
    );

    return recruiter;
  }

  async updateRecruiter(
    userId: number,
    jobId: number,
    recruiterData: UpdateRecruiterDto,
  ) {
    await this.jobsService.isUserNotDisable(userId);
    const job = await this.jobsService.findJob(userId, jobId);
    if (!job.recruiter) {
      throw new NotFoundException('Recrutador não encontrado ou não existe');
    }

    const recruiter = await this.recruitersRepository.update(
      jobId,
      recruiterData,
    );

    return recruiter;
  }

  async getRecruiter(userId: number, jobId: number) {
    await this.jobsService.isUserNotDisable(userId);
    const { recruiter } = await this.jobsService.findJob(userId, jobId);
    if (!recruiter) {
      throw new NotFoundException('Recrutador não encontrado ou não existe');
    }

    return recruiter;
  }

  async deleteRecruiter(userId: number, jobId: number) {
    await this.jobsService.isUserNotDisable(userId);
    const { recruiter } = await this.jobsService.findJob(userId, jobId);
    if (!recruiter) {
      throw new NotFoundException('Recrutador não encontrado ou não existe');
    }

    await this.recruitersRepository.delete(jobId);
  }
}
