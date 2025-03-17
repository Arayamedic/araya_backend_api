import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserEmailDto {
  @ApiProperty({
    type: 'string',
    example: 'kingsleyemeka31@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: '942483',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
