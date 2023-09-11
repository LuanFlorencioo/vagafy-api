import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesRepository } from './companies.repository';
import { JobsService } from '../jobs/jobs.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private companiesRepository: CompaniesRepository,
    private jobsService: JobsService,
  ) {}

  async updateCompany(
    userId: number,
    jobId: number,
    companyData: UpdateCompanyDto,
  ) {
    await this.jobsService.isUserNotDisable(userId);
    await this.findCompany(userId, jobId);
    const company = await this.companiesRepository.update(jobId, companyData);

    return company;
  }

  async getAllCompanies(userId: number) {
    await this.jobsService.isUserNotDisable(userId);
    const companies = await this.companiesRepository.getAll(userId);

    return companies;
  }

  async findCompany(userId: number, jobId: number) {
    try {
      await this.jobsService.isUserNotDisable(userId);
      const company = await this.companiesRepository.getOne(userId, jobId);

      return company;
    } catch {
      throw new NotFoundException('Vaga não encontrada ou não existe');
    }
  }

  async getOneCompany(userId: number, jobId: number) {
    await this.jobsService.isUserNotDisable(userId);
    const company = await this.findCompany(userId, jobId);

    return company;
  }
}
