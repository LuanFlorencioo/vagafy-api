import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RecruitersModule } from './modules/recruiters/recruiters.module';
import { ProgressModule } from './modules/progress/progress.module';
import { CheckpointsModule } from './modules/checkpoints/checkpoints.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    JobsModule,
    CompaniesModule,
    RecruitersModule,
    ProgressModule,
    CheckpointsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
