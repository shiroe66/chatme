import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
}));
