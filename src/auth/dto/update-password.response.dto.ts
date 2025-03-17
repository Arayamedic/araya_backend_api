import { ApiResponseProperty } from '@nestjs/swagger';

export class UpdatePasswordResponse {
  @ApiResponseProperty({
    type: 'string',
    example: 'Password updated successfully',
  })
  message: string;
}
