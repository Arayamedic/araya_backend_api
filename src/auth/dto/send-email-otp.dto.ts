import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { OtpType } from 'src/common/enums/otp-type.enum';

export class SendEmailOtpDto {
  @ApiProperty({
    type: 'string',
    example: 'kingsleyemeka31@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: OtpType,
    example: OtpType.email_verification,
    examples: [OtpType.email_verification, OtpType.forgot_password],
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(OtpType)
  otpType: OtpType;
}
