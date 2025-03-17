import { ApiResponseProperty } from '@nestjs/swagger';

export class SendEmailOtpResponse {
  @ApiResponseProperty({
    type: 'string',
    example: 'Email OTP sent',
  })
  message: string;
}
