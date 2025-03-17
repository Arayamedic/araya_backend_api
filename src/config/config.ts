import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRY_IN_H0URS: 48,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
};
