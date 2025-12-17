import { Todo, TodoStatus } from "../1/type";

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  if (state === undefined || state === null) {
    throw new Error("Error");
  }

  let result: Todo[] = state.map((object) => {
    const newStatus = completed ? TodoStatus.COMPLETED : TodoStatus.PENDING;
    return {
      id: object.id,
      title: object.title,
      description: object.description,
      status: newStatus,
      createdAt: object.createdAt,
    };
  });
  return result;
}

export function clearCompleted(state: Todo[]): Todo[] {
  if (state === undefined || state === null) {
    throw new Error("Error");
  }
  let result = state.filter((object) => object.status !== TodoStatus.COMPLETED);
  return result;
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  let filter_state = state.filter((obj) => obj.status === status);
  let num_result = filter_state.length;
  return num_result;
}
