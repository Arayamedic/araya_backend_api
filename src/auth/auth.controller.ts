import { Controller, Get, Post, Body, UseGuards, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticatedUserResponseDto } from './dto/register-user.response.dto';
import { BadRequestRequestDto } from 'src/common/dtos/bad-request.response.dto';
import { AuthGuard } from './auth.guard';
import { IUser } from 'src/common/contracts/user.interface';
import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { UnauthorizedRequestRequestDto } from 'src/common/dtos/unauthorized-request.response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { SendEmailOtpResponse } from './dto/send-email-otp.response.dto';
import { OtpType } from 'src/common/enums/otp-type.enum';
import { EmailVerifiedResponse } from './dto/email-verified.response.dto';
import { VerifyUserEmailDto } from './dto/verify-user-email.dto';
import { ResetPasswordResponse } from './dto/reset-password.response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordResponse } from './dto/update-password.response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    description: 'Create account for user and doctor.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiCreatedResponse({
    description: 'User has been registered successfully.',
    type: AuthenticatedUserResponseDto,
  })
  create(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthenticatedUserResponseDto> {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  @ApiOperation({
    description:
      'Login user, doctor, admin, super-admin, diagnostic-center, diagnostic-staff.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiOkResponse({
    description: 'User has been logged in successfully.',
    type: AuthenticatedUserResponseDto,
  })
  @HttpCode(200)
  login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<AuthenticatedUserResponseDto> {
    return this.authService.loginUser(loginUserDto);
  }

  @Get('me')
  @ApiOperation({
    description: 'Get logged in user data.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Expired or Invalid access token supplied',
    type: UnauthorizedRequestRequestDto,
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getLoggedInUser(@Req() request: Request): Promise<UserDto> {
    const requestUser = request['user'] as IUser;
    return this.authService.getAuthenticatedUser({ userId: requestUser.id });
  }

  @Post('send/email/otp')
  @ApiOperation({
    description: `Send OTP to users email for email confirmation or forgot password. \n otpType: ${OtpType.email_verification} or ${OtpType.forgot_password}`,
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiOkResponse({
    description: 'Email OTP sent successfully.',
    type: SendEmailOtpResponse,
  })
  @HttpCode(200)
  sendEmailOtp(
    @Body() sendEmailOtpDto: SendEmailOtpDto,
  ): Promise<SendEmailOtpResponse> {
    return this.authService.sendEmailOtp(sendEmailOtpDto);
  }

  @Post('verify/email')
  @ApiOperation({
    description: 'Verify user email with email verification otp.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiOkResponse({
    description: 'User email veriifed successfully',
    type: EmailVerifiedResponse,
  })
  @HttpCode(200)
  verifyUserEmail(
    @Body() verifyUserEmailDto: VerifyUserEmailDto,
  ): Promise<EmailVerifiedResponse> {
    return this.authService.verifyUserEmail(verifyUserEmailDto);
  }

  @Post('password/reset')
  @ApiOperation({
    description: 'Reset user password with email forgot otp.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiOkResponse({
    description: 'User password resset is successful.',
    type: ResetPasswordResponse,
  })
  @HttpCode(200)
  resetUserPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponse> {
    return this.authService.resetUserPassword(resetPasswordDto);
  }

  @Post('password/update')
  @ApiOperation({
    description: 'Update user password.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error response',
    type: BadRequestRequestDto,
  })
  @ApiOkResponse({
    description: 'User password updated successfully',
    type: UpdatePasswordResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Expired or Invalid access token supplied',
    type: UnauthorizedRequestRequestDto,
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  changeUserPassword(
    @Req() request: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdatePasswordResponse> {
    const requestUser = request['user'] as IUser;
    return this.authService.updateUserPassword({
      userId: requestUser.id,
      ...updatePasswordDto,
    });
  }
}
