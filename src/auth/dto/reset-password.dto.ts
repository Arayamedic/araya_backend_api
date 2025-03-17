import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
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

  @ApiProperty({
    type: 'string',
    example: 'password123',
    required: true,
  })
  @Length(5)
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
