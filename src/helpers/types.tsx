export interface Todo {
  id: number;
  title: string;
  description: string;
  assignee: string;
  date: string;
  time: string;
  status: string;
  priority: string;
}

export interface TodoList {
  id: number;
  listName: string;
  todos: Todo[];
  showFormToggle?: boolean;
}

export interface TodoState {
  todoLists: TodoList[];
  editedTodo: Todo | null;
  filtered: string;
  newTodos: [];
  selectedTodoListId: null;
}
