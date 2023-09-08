import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @UseGuards(AuthGuard)
  @Post(':job_id')
  createCheckpoint(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Body() checkpointData: CreateCheckpointDto,
  ) {
    return this.checkpointsService.createCheckpoint(
      userId,
      jobId,
      checkpointData,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':job_id')
  getAllCheckpoints(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
  ) {
    return this.checkpointsService.getAllCheckpoints(userId, jobId);
  }
}
