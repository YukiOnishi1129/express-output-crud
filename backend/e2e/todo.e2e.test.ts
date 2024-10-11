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
      const todo = await todoRepo.save(expected);
      const response = await request(app).get(`/api/todos/${todo.id}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject({
        id: todo.id,
        title: expected.title,
        content: expected.content,
      });
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo on POST /api/todos', async () => {
      const newTodo = { title: 'New Todo', content: 'This is a new todo.' };

      const response = await request(app).post('/api/todos').send(newTodo);

      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject(newTodo);
    });
  });
});
