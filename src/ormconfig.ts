import { ConnectionOptions } from 'typeorm';
 
const config: ConnectionOptions = {
  type: 'postgres',
  host: '172.18.0.2',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    `${__dirname  }src/models/**/*.{.ts,.js}`,
  ],
  migrations:["./database/migrations"],
  cli: {
    migrationsDir: './database/migrations',
  }
};
 
export default config;