import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config/config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: `${config.JWT_EXPIRY_IN_H0URS}h` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
