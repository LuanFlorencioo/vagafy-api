import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesRepository } from './companies.repository';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [CompaniesController],
  providers: [PrismaService, CompaniesService, CompaniesRepository],
})
export class CompaniesModule {}
