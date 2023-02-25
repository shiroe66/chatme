import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
  secret: process.env.MAIL_SECRET,
  expires_in: process.env.MAIL_EXPIRES_IN,
}));
