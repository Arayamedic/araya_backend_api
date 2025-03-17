import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { RegistrationRole } from 'src/common/enums/registration-role.enum';

export class RegisterUserDto {
  @ApiProperty({
    type: 'string',
    example: 'Kingsley',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: 'string',
    example: 'Chukwuemeka',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: 'string',
    example: '+2349012713738',
    required: true,
  })
  @IsPhoneNumber()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    enum: RegistrationRole,
    example: RegistrationRole.user,
    examples: [RegistrationRole.user, RegistrationRole.doctor],
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(RegistrationRole)
  role: RegistrationRole;

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
