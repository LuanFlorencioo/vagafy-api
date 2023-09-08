import { Module } from '@nestjs/common';
import { RecruitersService } from './recruiters.service';
import { RecruitersController } from './recruiters.controller';
import { JobsModule } from '../jobs/jobs.module';
import { PrismaService } from 'src/database/prisma.service';
import { RecruitersRepository } from './recruiters.repository';

@Module({
  imports: [JobsModule],
  controllers: [RecruitersController],
  providers: [PrismaService, RecruitersService, RecruitersRepository],
})
export class RecruitersModule {}
