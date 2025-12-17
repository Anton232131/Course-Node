import { TodoApi } from "../7/todo-api";
import { Todo, TodoStatus } from "../1/type";

export class TodoService {
  constructor(private readonly api: TodoApi) {}

  async create(title: string, description = ""): Promise<Todo> {
    if (!title || !title.trim()) {
      throw new Error("Нет титла");
    } else {
      const result = await this.api.add({
        title,
        description,
        status: TodoStatus.PENDING,
      });
      return result;
    }
  }

  async toggleStatus(id: number): Promise<Todo> {
    if (!id || isNaN(id) || id < 0) {
      throw new Error("Нету такого айди");
    } else {
      let allTodo = this.api.getAll();
      let currentTodo = (await allTodo).find((todo) => todo.id === id);
      if (!currentTodo) {
        throw new Error("Не найден Todo с таким id");
      } else {
        let newStatus: TodoStatus;
        if (currentTodo.status === TodoStatus.COMPLETED) {
          newStatus = TodoStatus.PENDING;
        } else {
          newStatus = TodoStatus.COMPLETED;
        }
        return this.api.update(id, { status: newStatus });
      }
    }
  }

  async search(keyword: string): Promise<Todo[]> {
    let allTodo = this.api.getAll();
    if (!keyword || !keyword.trim()) {
      return allTodo;
    } else {
      const lowerKeyword = keyword.trim().toLowerCase();
      const result = (await allTodo).filter((todo) => {
        const inTitle = todo.title.toLowerCase().indexOf(lowerKeyword) !== -1;
        const inDescription =
          todo.description.toLowerCase().indexOf(lowerKeyword || "") !== -1;
        return inTitle || inDescription;
      });
      return result;
    }
  }
}
