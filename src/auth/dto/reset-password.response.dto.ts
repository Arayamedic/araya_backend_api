import { ApiResponseProperty } from '@nestjs/swagger';

export class ResetPasswordResponse {
  @ApiResponseProperty({
    type: 'string',
    example: 'Password reset successfully',
  })
  message: string;
}
