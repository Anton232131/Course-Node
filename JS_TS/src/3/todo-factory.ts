import { Todo, NewTodo, TodoStatus } from "../1/type";

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  if (input === undefined) {
    throw new Error("Input not found");
  }

  return {
    id: nextId++,
    title: input.title,
    description: input.description ?? "",
    status: input.status ?? TodoStatus.PENDING,
    createdAt: new Date(),
  };
}
