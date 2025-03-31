import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { config } from 'src/config/config';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(config.RESEND_API_KEY);
  }

  async sendEmailConfirmationOtp(params: {
    username: string;
    userEmail: string;
    otp: string;
  }) {
    const message = `<p>Hi ${params.username}, <br> Welcome to Arayamedic Your email verification code is: ${params.otp}</p>`;
    await this.sendEmail({
      from: 'no-reply@araya.ng',
      to: params.userEmail,
      subject: 'Email Verification Code',
      message,
    });
    return true;
  }

  async sendForgotPasswordOtp(params: {
    username: string;
    userEmail: string;
    otp: string;
  }) {
    const message = `<p>Hi ${params.username}, <br> Your password reset otp is: ${params.otp}</p>`;
    await this.sendEmail({
      from: 'no-reply@araya.ng',
      to: params.userEmail,
      subject: 'Forgot Password OTP',
      message,
    });
    return true;
  }
  private async sendEmail(params: {
    from: string;
    to: string;
    subject: string;
    message: string;
  }) {
    await this.resend.emails.send({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.message,
    });
  }
}
