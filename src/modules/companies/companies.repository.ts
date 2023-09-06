import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    const companies = await this.prisma.company.findMany({
      where: {
        job: {
          user_id: userId,
        },
      },
    });

    return companies;
  }

  async getOne(userId: number, jobId: number) {
    const company = await this.prisma.company.findFirstOrThrow({
      where: {
        job: {
          id: jobId,
          user_id: userId,
        },
      },
    });

    return company;
  }

  async update(jobId: number, companyData: UpdateCompanyDto) {
    const company = await this.prisma.company.update({
      where: {
        job_id: jobId,
      },
      data: companyData,
    });

    return company;
  }
}
