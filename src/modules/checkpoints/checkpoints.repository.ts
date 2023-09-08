import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

@Injectable()
export class CheckpointsRepository {
  constructor(private prisma: PrismaService) {}

  async create(progressId: number, checkpointData: CreateCheckpointDto) {
    if (checkpointData.status) {
      await this.prisma.progress.update({
        where: {
          id: progressId,
        },
        data: {
          status: checkpointData.status,
        },
      });
      delete checkpointData.status;
    }

    const checkpoint = await this.prisma.checkpoint.create({
      data: {
        ...checkpointData,
        progress_id: progressId,
      },
    });

    return checkpoint;
  }
}
