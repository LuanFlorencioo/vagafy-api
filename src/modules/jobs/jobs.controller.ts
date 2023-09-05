import {
  Controller,
  UseGuards,
  HttpCode,
  Post,
  Param,
  Body,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { User } from 'src/decorators/user.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createJob(@User('sub') userId: number, @Body() jobData: CreateJobDto) {
    return this.jobsService.createJob(userId, jobData);
  }

  @UseGuards(AuthGuard)
  @Patch(':job_id')
  updateJob(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Body() jobData: UpdateJobDto,
  ) {
    return this.jobsService.updateJob(userId, jobId, jobData);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllJobs(@User('sub') userId: number) {
    return this.jobsService.getAllJobs(userId);
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  getJobsStats(@User('sub') userId: number) {
    return this.jobsService.getJobsStats(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':job_id')
  getOneJob(@User('sub') userId: number, @Param('job_id') jobId: number) {
    return this.jobsService.getOneJob(userId, jobId);
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(':job_id')
  deleteJob(@User('sub') userId: number, @Param('job_id') jobId: number) {
    return this.jobsService.deleteJob(userId, jobId);
  }
}
