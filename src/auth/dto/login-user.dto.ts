import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: 'string',
    example: 'kingsleyemeka31@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'password123',
    required: true,
  })
  @Length(5)
  @IsNotEmpty()
  password: string;
}
