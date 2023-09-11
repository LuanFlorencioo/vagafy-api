import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { CreateRecruiterDto } from '../recruiters/dto/create-recruiter.dto';

@Injectable()
export class JobsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, jobData: CreateJobDto) {
    const company: CreateCompanyDto = {
      name: jobData.company_name,
      website: jobData.company_website,
      linkedin: jobData.company_linkedin,
      logo_url: jobData.company_logo_url,
    };

    const data = {
      title: jobData.title,
      link: jobData.link,
      user_id: userId,
      company: {
        create: {
          ...company,
        },
      },
      progress: {
        create: {},
      },
    };

    if (jobData.recruiter_linkedin && jobData.recruiter_name) {
      const recruiter: CreateRecruiterDto = {
        name: jobData.recruiter_name,
        linkedin: jobData.recruiter_linkedin,
      };

      data['recruiter'] = {
        create: {
          ...recruiter,
        },
      };
    }

    const job = await this.prisma.job.create({
      data,
      include: {
        company: true,
        progress: true,
        recruiter: true,
      },
    });

    return job;
  }

  async update(userId: number, jobId: number, jobData: UpdateJobDto) {
    const job = await this.prisma.job.update({
      where: {
        id: jobId,
        user_id: userId,
      },
      data: jobData,
      include: {
        company: true,
        progress: true,
        recruiter: true,
      },
    });

    return job;
  }

  async getAll(userId: number) {
    const jobs = await this.prisma.job.findMany({
      where: {
        user_id: userId,
      },
      include: {
        company: true,
        progress: true,
        recruiter: true,
      },
      orderBy: {
        progress: {
          updated_at: 'desc',
        },
      },
    });

    return jobs;
  }

  async findJob(userId: number, jobId: number) {
    const job = await this.prisma.job.findUniqueOrThrow({
      where: {
        id: jobId,
        user_id: userId,
      },
      include: {
        company: true,
        progress: {
          include: {
            checkpoints: true,
          },
        },
        recruiter: true,
      },
    });

    return job;
  }

  async delete(userId: number, jobId: number) {
    await this.prisma.job.delete({
      where: {
        id: jobId,
        user_id: userId,
      },
    });
  }
}
