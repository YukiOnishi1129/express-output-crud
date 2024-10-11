import request from 'supertest';
import { Repository } from 'typeorm';
import { app } from '../src';
import { AppDataSource } from '../src/config/appDataSource';
import { Todo } from '../src/domain/entity/todo.entity';

let todoRepo: Repository<Todo>;
describe('【E2E Test Todo API 】', () => {
  beforeEach(async () => {
    todoRepo = AppDataSource.getInstance().getRepository(Todo);
    await todoRepo.clear();
  });
  describe('【GET /api/todos】', () => {
    it('Success: get 0 todos', async () => {
      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });

    it('Success: get todos', async () => {
      const expectedTodos = [
        {
          title: 'Test Todo1',
          content: 'This is a test todo item1.',
        },
        {
          title: 'Test Todo2',
          content: 'This is a test todo item2.',
        },
      ];
      await todoRepo.save(expectedTodos);
      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject([
        {
          title: 'Test Todo1',
          content: 'This is a test todo item1.',
        },
        {
          title: 'Test Todo2',
          content: 'This is a test todo item2.',
        },
      ]);
    });

    it('Success: get searched todos', async () => {
      const expectedTodos = [
        {
          title: 'Test Todo1',
          content: 'This is a test todo item1.',
        },
        {
          title: 'Test Todo2',
          content: 'This is a test todo item2.',
        },
      ];
      await todoRepo.save(expectedTodos);
      const response = await request(app).get('/api/todos').query({
        keyword: 'Todo1',
      });
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject([
        {
          title: 'Test Todo1',
          content: 'This is a test todo item1.',
        },
      ]);
    });
  });

  describe('【GET /api/todos/:id】', () => {
    it('Success: get todo', async () => {
      const expected = {
        title: 'Test Todo',
        content: 'This is a test todo item.',
      };
      const createdTodo = await todoRepo.save(expected);
      const received = await request(app).get(`/api/todos/${createdTodo.id}`);
      expect(received.status).toBe(200);
      expect(received.body.data).toMatchObject({
        id: createdTodo.id,
        title: expected.title,
        content: expected.content,
      });
    });

    it('Fail: not founded', async () => {
      const expected = {
        title: 'Test Todo',
        content: 'This is a test todo item.',
      };
      await todoRepo.save(expected);
      const received = await request(app).get(`/api/todos/2`);
      expect(received.status).toBe(404);
      expect(received.body.errors[0]).toBe('Not Found');
    });

    it('Fail: validation error not integer id', async () => {
      const expected = {
        title: 'Test Todo',
        content: 'This is a test todo item.',
      };
      await todoRepo.save(expected);
      const received = await request(app).get(`/api/todos/aaaaa`);
      expect(received.status).toBe(400);
      expect(received.body.errors[0]).toBe('id must be a positive integer');
    });
  });

  describe('【POST /api/todos】', () => {
    it('Success: create todo', async () => {
      const expected = { title: 'New Todo', content: 'This is a new todo.' };

      const received = await request(app).post('/api/todos').send(expected);

      expect(received.status).toBe(201);
      expect(received.body.data).toMatchObject(expected);
    });

    it('Success: create todo with 30 length title', async () => {
      const expected = {
        title: 'aiueo12345aiueo12345aiueo12345',
        content: 'This is a new todo.',
      };

      const received = await request(app).post('/api/todos').send(expected);

      expect(received.status).toBe(201);
      expect(received.body.data).toMatchObject(expected);
    });

    it('Fail: validation error not title request parameter', async () => {
      const expected = {
        content: 'This is a new todo.',
      };

      const received = await request(app).post('/api/todos').send(expected);
      expect(received.status).toBe(400);
      expect(received.body.errors[0]).toBe('title must not be empty');
    });

    it('Fail: validation error over title length', async () => {
      const expected = {
        title: 'aiueo12345aiueo12345aiueo12345a',
        content: 'This is a new todo.',
      };

      const received = await request(app).post('/api/todos').send(expected);
      expect(received.status).toBe(400);
      expect(received.body.errors[0]).toBe(
        'title must not exceed 30 characters',
      );
    });

    it('Fail: validation error not content request parameter', async () => {
      const expected = {
        title: 'Todo1',
      };

      const received = await request(app).post('/api/todos').send(expected);
      expect(received.status).toBe(400);
      expect(received.body.errors[0]).toBe('content must not be empty');
    });

    it('Fail: validation multi error', async () => {
      const expected = {};

      const received = await request(app).post('/api/todos').send(expected);
      expect(received.status).toBe(400);
      expect(received.body.errors[0]).toBe('title must not be empty');
      expect(received.body.errors[1]).toBe('content must not be empty');
    });
  });
});
