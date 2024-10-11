export type TodoType = {
  id: number;
  title: string;
  content: string;
};

export type ResponseTodoListType = {
  data?: Array<TodoType>;
  status: number;
};

export type ResponseTodoType = {
  data?: TodoType;
  status: number;
};
