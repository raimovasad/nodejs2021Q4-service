import dotenv from 'dotenv';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, '../../.env')
});


const config = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  AUTH_MODE: process.env.AUTH_MODE === 'true' as string
};

export default config;
