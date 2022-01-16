import dotenv from 'dotenv';
import path from 'path';



dotenv.config({
  path: path.join(__dirname, '../../.env')
});


const config = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  POSTGRES_USER: process.env.POSTGRES_USER as string,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
  POSTGRES_DB: process.env.POSTGRES_DB as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  AUTH_MODE: process.env.AUTH_MODE === 'true' as string,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL as string
};

export default config;
