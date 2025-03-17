import { ApiResponseProperty } from '@nestjs/swagger';
import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';

export class UserDto {
  @ApiResponseProperty({
    type: 'string',
    example: '56866c6d-e682-4569-a6bf-8eec12d62c1d',
  })
  id: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'kingsleyemeka31@gmail.com',
  })
  email: string;

  @ApiResponseProperty({
    type: 'string',
    example: Role.user,
  })
  role: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Kingsley',
  })
  firstName: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Chukwuemeka',
  })
  lastName: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Ebuka',
  })
  middleName?: string | null;

  @ApiResponseProperty({
    type: 'string',
    example: 'slimzy',
  })
  nickName?: string | null;

  @ApiResponseProperty({
    type: 'boolean',
    example: false,
  })
  emailIsVerified: boolean;

  @ApiResponseProperty({
    type: 'string',
    example: Gender.male,
  })
  gender?: string | null;

  @ApiResponseProperty({
    type: 'string',
    example: '2025-03-17T23:56:51.212Z',
  })
  dob?: Date | null;

  @ApiResponseProperty({
    type: 'string',
    example: '+2349012713738',
  })
  phoneNumber: string;

  @ApiResponseProperty({
    type: 'boolean',
    example: false,
  })
  phoneNumberIsVerified: boolean;

  @ApiResponseProperty({
    type: 'string',
    example: '2025-03-17T23:56:51.212Z',
  })
  createdAt: Date | null;
}
