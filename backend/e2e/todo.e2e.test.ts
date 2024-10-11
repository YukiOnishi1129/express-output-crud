import request from 'supertest';
import { app } from '../src';
import { Repository } from 'typeorm';
import { AppDataSource } from '../src/config/appDataSource';
import { Todo } from '../src/domain/entity/todo.entity';

let todoRepo: Repository<Todo>;
describe('Todo API E2E Test', () => {
  beforeEach(async () => {
    todoRepo = AppDataSource.getInstance().getRepository(Todo);
    await todoRepo.clear();
  });
  describe('GET /api/todos', () => {
    it('should return an empty todo list on GET /api/todos', async () => {
      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return a todo item on GET /api/todos/:id', async () => {
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
  });

  describe('POST /api/todos', () => {
    it('should create a new todo on POST /api/todos', async () => {
      const expected = { title: 'New Todo', content: 'This is a new todo.' };

      const received = await request(app).post('/api/todos').send(expected);

      expect(received.status).toBe(201);
      expect(received.body.data).toMatchObject(expected);
    });
  });
});
