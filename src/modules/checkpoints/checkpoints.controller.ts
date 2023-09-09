import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

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

  @UseGuards(AuthGuard)
  @Patch(':job_id/:checkpoint_id')
  updateCheckpoint(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Param('checkpoint_id') checkpointId: number,
    @Body() checkpointData: UpdateCheckpointDto,
  ) {
    return this.checkpointsService.updateCheckpoint(
      userId,
      jobId,
      checkpointId,
      checkpointData,
    );
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(':job_id/:checkpoint_id')
  deleteCheckpoint(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Param('checkpoint_id') checkpointId: number,
  ) {
    return this.checkpointsService.deleteCheckpoint(
      userId,
      jobId,
      checkpointId,
    );
  }
}
