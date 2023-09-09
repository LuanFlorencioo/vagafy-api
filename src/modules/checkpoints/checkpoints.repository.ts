import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

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

  async find(progressId: number, checkpointId: number) {
    try {
      const checkpoint = await this.prisma.checkpoint.findFirstOrThrow({
        where: {
          progress_id: progressId,
          id: checkpointId,
        },
      });

      return checkpoint;
    } catch {
      throw new NotFoundException('Checkpoint não encontrado ou não existe');
    }
  }

  async update(checkpointId: number, checkpointData: UpdateCheckpointDto) {
    const checkpoint = await this.prisma.checkpoint.update({
      where: {
        id: checkpointId,
      },
      data: checkpointData,
    });

    return checkpoint;
  }

  async delete(checkpointId: number) {
    await this.prisma.checkpoint.delete({
      where: {
        id: checkpointId,
      },
    });
  }
}
