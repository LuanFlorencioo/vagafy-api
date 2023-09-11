import { Module } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointsController } from './checkpoints.controller';
import { JobsModule } from '../jobs/jobs.module';
import { PrismaService } from 'src/database/prisma.service';
import { CheckpointsRepository } from './checkpoints.repository';

@Module({
  imports: [JobsModule],
  controllers: [CheckpointsController],
  providers: [PrismaService, CheckpointsService, CheckpointsRepository],
})
export class CheckpointsModule {}
