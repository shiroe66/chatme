import { registerAs } from '@nestjs/config';

export default registerAs('psql', () => ({
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
}));
