import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllCompanies(@User('sub') userId: number) {
    return this.companiesService.getAllCompanies(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':job_id')
  getOneCompany(@User('sub') userId: number, @Param('job_id') jobId: number) {
    return this.companiesService.getOneCompany(userId, jobId);
  }

  @UseGuards(AuthGuard)
  @Patch(':job_id')
  updateCompany(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Body() companyData: UpdateCompanyDto,
  ) {
    return this.companiesService.updateCompany(userId, jobId, companyData);
  }
}
