import { ApiResponseProperty } from '@nestjs/swagger';

export class EmailVerifiedResponse {
  @ApiResponseProperty({
    type: 'string',
    example: 'Email Verified successfully',
  })
  message: string;
}
