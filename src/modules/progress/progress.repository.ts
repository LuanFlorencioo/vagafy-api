import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressRepository {
  constructor(private prisma: PrismaService) {}

  async update(jobId: number, progressData: UpdateProgressDto) {
    const progress = await this.prisma.progress.update({
      where: {
        job_id: jobId,
      },
      data: {
        ...progressData,
      },
    });

    return progress;
  }
}
