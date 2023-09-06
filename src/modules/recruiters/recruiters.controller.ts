import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { RecruitersService } from './recruiters.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Controller('recruiters')
export class RecruitersController {
  constructor(private readonly recruitersService: RecruitersService) {}

  @UseGuards(AuthGuard)
  @Post(':job_id')
  createRecruiter(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Body() recruiterData: CreateRecruiterDto,
  ) {
    return this.recruitersService.createRecruiter(userId, jobId, recruiterData);
  }

  @UseGuards(AuthGuard)
  @Patch(':job_id')
  updateRecruiter(
    @User('sub') userId: number,
    @Param('job_id') jobId: number,
    @Body() recruiterData: UpdateRecruiterDto,
  ) {
    return this.recruitersService.updateRecruiter(userId, jobId, recruiterData);
  }

  @UseGuards(AuthGuard)
  @Get(':job_id')
  getRecruiter(@User('sub') userId: number, @Param('job_id') jobId: number) {
    return this.recruitersService.getRecruiter(userId, jobId);
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(':job_id')
  deleteRecruiter(@User('sub') userId: number, @Param('job_id') jobId: number) {
    return this.recruitersService.deleteRecruiter(userId, jobId);
  }
}
