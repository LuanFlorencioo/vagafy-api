import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersModule } from '../users/users.module';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';
import { JobsStatsService } from 'src/utils/jobs-stats.service';

@Module({
  imports: [UsersModule],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, PrismaService, JobsStatsService],
  exports: [JobsService],
})
export class JobsModule {}
