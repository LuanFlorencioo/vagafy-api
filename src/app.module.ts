import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
