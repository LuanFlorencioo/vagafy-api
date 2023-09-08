import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { JobsModule } from '../jobs/jobs.module';
import { PrismaService } from 'src/database/prisma.service';
import { ProgressRepository } from './progress.repository';

@Module({
  imports: [JobsModule],
  controllers: [ProgressController],
  providers: [PrismaService, ProgressService, ProgressRepository],
})
export class ProgressModule {}
