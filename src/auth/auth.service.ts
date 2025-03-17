import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRepository } from '../database/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { AuthenticatedUserResponseDto } from './dto/register-user.response.dto';
import { and, eq } from 'drizzle-orm';
import { emailOtps, users } from 'src/database/schema/schema';
import { LoginUserDto } from './dto/login-user.dto';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { SendEmailOtpResponse } from './dto/send-email-otp.response.dto';
import { EmailOtpRepository } from 'src/database/repositories/email-otp.repository';
import * as otpGenerator from 'otp-generator';
import { EmailService } from 'src/email/email.service';
import { OtpType } from 'src/common/enums/otp-type.enum';
import { VerifyUserEmailDto } from './dto/verify-user-email.dto';
import { EmailVerifiedResponse } from './dto/email-verified.response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordResponse } from './dto/reset-password.response.dto';
import { UpdatePasswordResponse } from './dto/update-password.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositor: UserRepository,
    private readonly emailOtpRepository: EmailOtpRepository,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    params: RegisterUserDto,
  ): Promise<AuthenticatedUserResponseDto> {
    const userWithEmailExists = await this.userRepositor.findOne({
      where: eq(users.email, params.email),
    });
    if (userWithEmailExists)
      throw new BadRequestException('User with same email already exists.');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(params.password, salt);
    const createdUser = await this.userRepositor.create({
      ...params,
      password: hashedPassword,
    });
    const { password, ...user } = createdUser;
    password.trim();
    const accessToken = await this.jwtService.signAsync(user);
    const now = new Date();
    now.setHours(config.JWT_EXPIRY_IN_H0URS);
    return {
      accessToken,
      expiresAt: now.toISOString(),
      message: 'User regisstration is Successful',
    };
  }

  async loginUser(params: LoginUserDto): Promise<AuthenticatedUserResponseDto> {
    const foundUser = await this.userRepositor.findOne({
      where: eq(users.email, params.email),
    });
    if (!foundUser) throw new BadRequestException('Invalid login details');

    const isMatch = await bcrypt.compare(params.password, foundUser.password);
    if (!isMatch) throw new BadRequestException('Invalid login details');

    const { password, ...user } = foundUser;
    password.trim();
    const accessToken = await this.jwtService.signAsync(user);
    const now = new Date();
    now.setHours(config.JWT_EXPIRY_IN_H0URS);
    return {
      accessToken,
      expiresAt: now.toISOString(),
      message: 'User regisstration is Successful',
    };
  }

  async getAuthenticatedUser(params: { userId: string }) {
    const foundUser = await this.userRepositor.findOne({
      where: eq(users.id, params.userId),
    });
    if (!foundUser) throw new BadRequestException('User not found');
    const { password, ...user } = foundUser;
    String(password);
    return user;
  }

  async sendEmailOtp(params: SendEmailOtpDto): Promise<SendEmailOtpResponse> {
    const foundUser = await this.userRepositor.findOne({
      where: eq(users.email, params.email),
    });
    if (!foundUser) throw new BadRequestException('User does not exist');
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const emailOtp = await this.emailOtpRepository.findOne({
      where: and(
        eq(emailOtps.email, params.email),
        eq(emailOtps.otpType, params.otpType),
        eq(emailOtps.isVerified, false),
      ),
    });

    if (emailOtp) {
      await this.emailOtpRepository.update(
        { otp },
        eq(emailOtps.id, emailOtp.id),
      );
    } else {
      await this.emailOtpRepository.create({
        email: params.email,
        otp,
        otpType: params.otpType,
      });
    }
    try {
      if (params.otpType == OtpType.email_verification) {
        await this.emailService.sendEmailConfirmationOtp({
          username: foundUser.firstName,
          userEmail: params.email,
          otp,
        });
      }

      if (params.otpType == OtpType.forgot_password) {
        await this.emailService.sendForgotPasswordOtp({
          username: foundUser.firstName,
          userEmail: params.email,
          otp,
        });
      }
    } catch (e) {
      console.log('Error Sending email', e);
    }

    return {
      message: 'Otp sent successfully.',
    };
  }

  async verifyUserEmail(
    params: VerifyUserEmailDto,
  ): Promise<EmailVerifiedResponse> {
    const emailOtp = await this.emailOtpRepository.findOne({
      where: and(
        eq(emailOtps.email, params.email),
        eq(emailOtps.otpType, OtpType.email_verification),
        eq(emailOtps.otp, params.otp),
        eq(emailOtps.isVerified, false),
      ),
    });
    if (!emailOtp) throw new BadRequestException('Invalid OTP supplied');
    await this.emailOtpRepository.update(
      { isVerified: true },
      eq(emailOtps.id, emailOtp.id),
    );
    await this.userRepositor.update(
      { emailIsVerified: true },
      eq(users.email, params.email),
    );
    return {
      message: 'Email verified successfully.',
    };
  }

  async resetUserPassword(
    params: ResetPasswordDto,
  ): Promise<ResetPasswordResponse> {
    const emailOtp = await this.emailOtpRepository.findOne({
      where: and(
        eq(emailOtps.email, params.email),
        eq(emailOtps.otpType, OtpType.forgot_password),
        eq(emailOtps.otp, params.otp),
        eq(emailOtps.isVerified, false),
      ),
    });
    if (!emailOtp) throw new BadRequestException('Invalid OTP supplied');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(params.newPassword, salt);
    await this.emailOtpRepository.update(
      { isVerified: true },
      eq(emailOtps.id, emailOtp.id),
    );
    await this.userRepositor.update(
      { password: hashedPassword },
      eq(users.email, params.email),
    );
    return {
      message: 'Password reset successfully.',
    };
  }

  async updateUserPassword(params: {
    oldPassword: string;
    newPassword: string;
    userId: string;
  }): Promise<UpdatePasswordResponse> {
    if (params.oldPassword == params.newPassword)
      throw new BadRequestException(
        'New password must be different from old password.',
      );
    const foundUser = await this.userRepositor.findOne({
      where: eq(users.id, params.userId),
    });
    if (!foundUser) throw new BadRequestException('User not found');

    const isMatch = await bcrypt.compare(
      params.oldPassword,
      foundUser.password,
    );
    if (!isMatch) throw new BadRequestException('Old password is incorrect.');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(params.newPassword, salt);
    await this.userRepositor.update(
      { password: hashedPassword },
      eq(users.id, params.userId),
    );
    return {
      message: 'Password updated successfully.',
    };
  }
}
