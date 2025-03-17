import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
    example: 'password123',
    required: true,
  })
  @Length(5)
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: 'string',
    example: 'password123new',
    required: true,
  })
  @Length(5)
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
