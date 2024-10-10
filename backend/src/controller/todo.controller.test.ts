import { AppDataSource } from '@/config/appDataSource';
import { StartedMySqlContainer, MySqlContainer } from '@testcontainers/mysql';
import {
  DockerComposeEnvironment,
  GenericContainer,
  StartedTestContainer,
} from 'testcontainers';
import { Todo } from '@/domain/entity/todo.entity';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { DataSource } from 'typeorm';
import { getTodoListHandler } from '@/controller/todo.controller';
import { sendSuccess, sendError } from '@/shared/response/sendResponse';

jest.mock('@/shared/response/sendResponse');

let mysqlContainer: StartedTestContainer;
let dataSource: DataSource;
let req: any;
let res: any;
let next: any;

const dbName = 'test_db';
const username = 'test_user';
const password = 'test_password';

const initializeDatabase = async () => {
  // データベースの作成
  await dataSource.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
};

describe('todo.controller.ts', () => {
  beforeAll(async () => {
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

    await initializeDatabase();
  }, 30000);

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await dataSource.destroy(); // データソースを閉じる
    await mysqlContainer.stop(); // コンテナを停止
  });

  it('should return an empty todo list on success', async () => {
    // 初期状態では空のTodoリストが返る
    await getTodoListHandler(req, res, next);

    expect(sendSuccess).toHaveBeenCalledWith(res, 200, []);
  });

  it('should return a todo list with items', async () => {
    // テスト用データをDBに挿入
    const todoRepo = dataSource.getRepository(Todo);
    await todoRepo.save({
      title: 'Test Todo',
      content: 'This is a test todo item.',
    });

    await getTodoListHandler(req, res, next);

    // 正しい結果が返されるかを確認
    expect(sendSuccess).toHaveBeenCalledWith(
      res,
      200,
      expect.arrayContaining([expect.objectContaining({ title: 'Test Todo' })]),
    );
  });
});
