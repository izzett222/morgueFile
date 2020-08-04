import { config } from 'dotenv';

config();
const env = {
  development: {
    url: process.env.DATABASE_URL_DEVELOPMENT,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  tets: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
  },
};
export default env;
