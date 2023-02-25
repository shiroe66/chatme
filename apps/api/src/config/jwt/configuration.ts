import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN,
  refresh_secret: process.env.REFRESH_SECRET,
  refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
}));
