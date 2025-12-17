import { toggleAll, clearCompleted, countByStatus } from "../5/todo-bulk";
import { createTodo } from "../3/todo-factory";
import { TodoStatus } from "../1/type";

describe("Task 05: Bulk operations & selectors", () => {
  const a = createTodo({ title: "A" });
  const b = createTodo({ title: "B" });
  const list = [a, b];

  it("toggleAll should mark all as completed", () => {
    const completed = toggleAll(list, true);
    expect(completed.every((t) => t.status === TodoStatus.COMPLETED)).toBe(
      true
    );
    expect(list.every((t) => t.status === TodoStatus.PENDING)).toBe(true);
  });

  it("clearCompleted should remove completed items", () => {
    const done = toggleAll(list, true);
    const cleared = clearCompleted(done);
    expect(cleared).toHaveLength(0);
  });

  it("countByStatus should return correct number", () => {
    const count = countByStatus(list, TodoStatus.PENDING);
    expect(count).toBe(2);
  });
});
