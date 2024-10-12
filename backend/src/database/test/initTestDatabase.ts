import { DataSource } from 'typeorm';

export const initTestDatabase = async (
  dataSource: DataSource,
  dbName: string,
) => {
  // データベースの作成
  await dataSource.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

  // テーブルの作成
  await dataSource.query(
    `CREATE TABLE IF NOT EXISTS \`todos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`content\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
  );
};
