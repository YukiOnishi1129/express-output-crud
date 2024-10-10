import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { DataSource } from 'typeorm';
import { AppDataSource } from './src/config/appDataSource';

let mysqlContainer: StartedTestContainer;
let dataSource: DataSource;
const dbName = 'test_db';
const username = 'test_user';
const password = 'test_password';

const initializeDatabase = async () => {
  // データベースの作成
  await dataSource.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
};

global.beforeAll(async () => {
  mysqlContainer = await new GenericContainer('mysql:8.0')
    .withExposedPorts(3306)
    .withEnvironment({
      MYSQL_ROOT_PASSWORD: password,
      MYSQL_DATABASE: dbName,
      MYSQL_USER: username,
      MYSQL_PASSWORD: password,
    })
    .start();

  process.env.MYSQL_CONTAINER_NAME = mysqlContainer.getHost();
  process.env.MYSQL_CONTAINER_PORT = mysqlContainer
    .getMappedPort(3306)
    .toString();
  process.env.MYSQL_USER = username;
  process.env.MYSQL_PASSWORD = password;
  process.env.MYSQL_DATABASE = dbName;

  // データソースを初期化
  dataSource = await AppDataSource.initialize();

  // 必要に応じて、データベースの初期化処理を実行
  await initializeDatabase();
}, 30000);

global.afterAll(async () => {
  await dataSource.destroy(); // データソースを閉じる
  await mysqlContainer.stop(); // コンテナを停止
});
