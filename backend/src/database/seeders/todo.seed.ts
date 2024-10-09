import { AppDataSource } from '../../config/dataSource';
import { Todo } from '../../domain/entity/Todo';

export const TodoSeedData = async () => {
  const dataSource = await AppDataSource.initialize();
  const todoRepository = dataSource.getRepository(Todo);

  // サンプルデータ
  const todos = [
    { title: 'Todo 1', content: 'This is the first todo.' },
    { title: 'Todo 2', content: 'This is the second todo.' },
    { title: 'Todo 3', content: 'This is the third todo.' },
  ];

  // データを挿入
  for (const todo of todos) {
    const todoEntity = todoRepository.create(todo);
    await todoRepository.save(todoEntity);
  }
  await dataSource.destroy();
};
