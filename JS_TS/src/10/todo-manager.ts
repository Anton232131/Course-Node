import { TodoService } from "../8/todo-service";
import { TodoApi } from "../7/todo-api";
import { Todo } from "../1/type";

export class ToDoManager {
  private service = new TodoService(new TodoApi());

  async init(): Promise<void> {
    await this.add("HI", "i am 9");
    await this.add("Goodbye", "I am 10");
  }

  async add(title: string, description = ""): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }

  async list(): Promise<Todo[]> {
    let result = await this.service.search("");
    return result;
  }
}
