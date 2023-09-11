import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Injectable()
export class RecruitersRepository {
  constructor(private prisma: PrismaService) {}

  async create(jobId: number, recruiterData: CreateRecruiterDto) {
    const recruiter = await this.prisma.recruiter.create({
      data: {
        ...recruiterData,
        job_id: jobId,
      },
    });

    return recruiter;
  }

  async update(jobId: number, recruiterData: UpdateRecruiterDto) {
    const recruiter = await this.prisma.recruiter.update({
      where: {
        job_id: jobId,
      },
      data: {
        ...recruiterData,
      },
    });

    return recruiter;
  }

  async delete(jobId: number) {
    await this.prisma.recruiter.delete({
      where: {
        job_id: jobId,
      },
    });
  }
}
