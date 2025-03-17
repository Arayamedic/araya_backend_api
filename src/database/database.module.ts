import { Module } from '@nestjs/common';
import 'dotenv/config';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as schema from './schema/schema';
import { UserRepository } from './repositories/user.repository';
import { DoctorRepository } from './repositories/doctor.repository';
import { EmailOtpRepository } from './repositories/email-otp.repository';

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DB_DEV',
      postgres: {
        url: process.env.DATABASE_URL as string,
      },
      config: { schema: { ...schema } },
    }),
  ],
  providers: [UserRepository, DoctorRepository, EmailOtpRepository],
  exports: [
    DrizzlePostgresModule,
    UserRepository,
    DoctorRepository,
    EmailOtpRepository,
  ], // Export repositories for use in other modules
})
export class DatabaseModule {}
