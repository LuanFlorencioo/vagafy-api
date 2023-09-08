import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { User } from 'src/decorators/user.decorator';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @UseGuards(AuthGuard)
  @Patch(':job_id')
  updateProgress(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Body() progressData: UpdateProgressDto,
  ) {
    return this.progressService.updateProgress(userId, jobId, progressData);
  }

  @UseGuards(AuthGuard)
  @Get(':job_id')
  getProgress(@User('sub') userId: number, @Param('job_id') jobId: number) {
    return this.progressService.getProgress(userId, jobId);
  }
}
