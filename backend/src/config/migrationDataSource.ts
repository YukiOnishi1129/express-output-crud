import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const MigrationDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'pass',
  database: 'EXPRESS_OUTPUT_CRUD_DB',
  entities: ['src/domain/entity/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  logging: true,
  synchronize: true,
});
