import { config } from 'dotenv';

config();
const env = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
  },
};
export default env;
