import { InMemoryRepository, EntityNotFoundError } from "./repository";
import { Todo, NewTodo } from "../1/type";

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    const randomtime = Math.random() * 300 + 300;
    const promise: Todo[] = await new Promise((resolve) => {
      setTimeout(() => {
        const allTodos: Todo[] = this.repo.findAll();
        resolve(allTodos);
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
          id: 0,
          createdAt: new Date(),
        };
        const addTodos: Todo = this.repo.add(newTodos);
        resolve(addTodos);
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
        try {
          const updateTodos = this.repo.update(id, update);
          resolve(updateTodos);
        } catch (error) {
          if (error instanceof EntityNotFoundError) {
            reject(new EntityNotFoundError(id));
          } else {
            reject("Error");
          }
        }
      }, randomtime);
    });
    return promise;
  }

  async remove(id: number): Promise<void> {
    const randomtime = Math.random() * 300 + 300;
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          const removeTodos = this.repo.remove(id);
          resolve(removeTodos);
        } catch (error) {
          if (error instanceof EntityNotFoundError) {
            reject(new EntityNotFoundError(id));
          } else {
            reject("Error");
          }
        }
      }, randomtime);
    });
  }
}
