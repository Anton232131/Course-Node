import { addTodo, updateTodo, removeTodo, getTodo } from "../4/todo-crud";
import { createTodo } from "../3/todo-factory";
import { TodoStatus, Todo } from "../1/type";

describe("Task 04: CRUD operations", () => {
  const base: Todo[] = [];
  const todo = createTodo({ title: "X" });

  it("addTodo should add item immutably", () => {
    const next = addTodo(base, todo);
    expect(next).toHaveLength(1);
    expect(base).toHaveLength(0);
  });
  
  it("updateTodo should update fields immutably", () => {
    const list = addTodo(base, todo);
    const updated = updateTodo(list, todo.id, { status: TodoStatus.COMPLETED });
    expect(updated.find((t) => t.id === todo.id)!.status).toBe(
      TodoStatus.COMPLETED
    );
    expect(list.find((t) => t.id === todo.id)!.status).toBe(TodoStatus.PENDING);
  });

  it("removeTodo should remove item immutably", () => {
    const list = addTodo(base, todo);
    const after = removeTodo(list, todo.id);
    expect(after).toHaveLength(0);
    expect(list).toHaveLength(1);
  });

  it("getTodo should return item by id", () => {
    const list = addTodo(base, todo);
    expect(getTodo(list, todo.id)).toEqual(todo);
  });
});
