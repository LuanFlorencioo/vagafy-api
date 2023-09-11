import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/utils/mail.service';
import { UserValidationService } from 'src/utils/user-validation.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '3h' },
    }),
    MailerModule.forRoot({
      defaults: {
        from: process.env.SMTP_ACCOUNT,
      },
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.SMTP_ACCOUNT,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    UsersRepository,
    UserValidationService,
    MailService,
  ],
  exports: [UsersService, UsersRepository, MailService, UserValidationService],
})
export class UsersModule {}
