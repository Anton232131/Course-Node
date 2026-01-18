export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
}

export interface TodoItemProps {
  todo: Todo;
}

export interface ActiveCountProps {
  todos: Todo[];
}

export interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export interface TodoListItem {
  todo: Todo;
  onComplete: (id: number) => void;
  onRemove: (id: number) => void;
}

export interface TodoLists {
  todos: Todo[];
  onComplete: (id: number) => void;
  onRemove: (id: number) => void;
}
