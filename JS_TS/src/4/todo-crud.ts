import type { Todo } from "../1/type";

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  if (todo === null || todo === undefined) {
    throw new TypeError("Error");
  }
  return [...state, todo];
}

export function updateTodo(
  state: Todo[],
  id: number,
  update: Partial<Omit<Todo, "id" | "createdAt">>
): Todo[] {
  if (state === null || state === undefined) {
    throw new TypeError("Error");
  }
  return state.map((obj) => {
    if (obj.id === id) {
      return { ...obj, ...update };
    }
    return obj;
  });
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  if (state === null || state === undefined) {
    throw new TypeError("Error");
  }
  return state.filter((todo) => todo.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find((obj) => obj.id === id);
}
