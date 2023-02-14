import { registerAs } from '@nestjs/config';

export default registerAs('psql', () => ({
  PSQL_HOST: process.env.POSTGRESQL_HOST,
  PSQL_PORT: process.env.POSTGRESQL_PORT,
  PSQL_USERNAME: process.env.POSTGRESQL_USERNAME,
  PSQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
  PSQL_DATABASE: process.env.POSTGRESQL_DATABASE,
}));
