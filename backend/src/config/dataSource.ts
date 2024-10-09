import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_CONTAINER_NAME,
  port: Number(process.env.MYSQL_CONTAINER_PORT) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/domain/entity/*.js'],
  migrations: ['src/database/migrations/**/*.js'],
  logging: true,
  synchronize:
    process.env.NODE_ENV !== 'staging' && process.env.NODE_ENV !== 'production',
});
