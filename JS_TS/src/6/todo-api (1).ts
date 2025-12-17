import { Todo, NewTodo } from "../1/type";

export class TodoApi {
  private todos: Todo[] = [];
  private nextId = 1;

  async getAll(): Promise<Todo[]> {
    const randomtime = Math.random() * 300 + 300;
    const promise: Todo[] = await new Promise((resolve) => {
      setTimeout(() => {
        const result = this.todos.slice();
        resolve(result);
      }, randomtime);
    });
    return promise;
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    const randomtime = Math.random() * 300 + 300;
    const promise: Todo = await new Promise((resolve) => {
      setTimeout(() => {
        const newTodos = {
          ...newTodo,
          id: this.nextId++,
          createdAt: new Date(),
        } as Todo;
        this.todos.push(newTodos);
        resolve(newTodos);
      }, randomtime);
    });
    return promise;
  }

  async update(
    id: number,
    update: Partial<Omit<Todo, "id" | "createdAt">>
  ): Promise<Todo> {
    const randomtime = Math.random() * 300 + 300;
    const promise: Todo = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let index = this.todos.findIndex((element) => element.id === id);
        if (index == -1) {
          reject(new TodoNotFoundError(id));
          return;
        }
        const todo = this.todos[index];
        const newTodo = {
          ...todo,
          ...update,
        } as Todo;
        this.todos[index] = newTodo;
        resolve(newTodo);
      }, randomtime);
    });
    return promise;
  }

  async remove(id: number): Promise<void> {
    const randomtime = Math.random() * 300 + 300;
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        let index = this.todos.findIndex((element) => element.id === id);
        if (index == -1) {
          reject(new TodoNotFoundError(id));
          return;
        }
        this.todos.splice(index, 1);
        resolve();
      }, randomtime);
    });
  }
}

export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with this ${id} not found`);
    this.name = "TodoNotFoundError";
  }
}
