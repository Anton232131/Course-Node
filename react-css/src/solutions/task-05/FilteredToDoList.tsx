import React, { useMemo, useState } from "react";
import { Todo } from "../../types";

/**
 * Task 5: FilteredToDoList Component
 *
 * Theory: Derived State and Computed Values
 *
 * In React, you often need to compute values based on your state. These are called "derived state"
 * or "computed values" and should be calculated during render rather than stored in state.
 *
 * Why Use Derived State:
 * 1. Avoids state synchronization issues
 * 2. Reduces complexity by having a single source of truth
 * 3. Automatically updates when source data changes
 * 4. Prevents stale state bugs
 *
 * Common Derived State Patterns:
 *
 * Filtering:
 * - const activeTodos = todos.filter(todo => !todo.completed)
 * - const completedTodos = todos.filter(todo => todo.completed)
 *
 * Searching:
 * - const filteredTodos = todos.filter(todo =>
 *     todo.title.toLowerCase().includes(searchTerm.toLowerCase())
 *   )
 *
 * Sorting:
 * - const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title))
 *
 * Aggregations:
 * - const completedCount = todos.filter(todo => todo.completed).length
 * - const totalCount = todos.length
 *
 * Multiple Filters:
 * - Use multiple filter conditions or combine them
 * - Consider using useMemo for expensive computations
 *
 * Key Concepts:
 * - Calculate derived values during render
 * - Don't store computed values in state
 * - Use useMemo for expensive calculations
 * - Keep state minimal and derive the rest
 */
export const FilteredToDoList: React.FC = () => {
  // TODO: Implement the FilteredToDoList component
  //
  // Requirements:
  // 1. Display a list of todos with add functionality
  // 2. Add filter buttons: "All", "Active", "Completed"
  // 3. Filter todos based on selected filter
  // 4. Use derived state for filtered results
  // 5. Add complete functionality for todos
  //
  // Example implementation:
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  //
  // const filteredTodos = todos.filter(todo => {
  //   if (filter === 'active') return !todo.completed;
  //   if (filter === 'completed') return todo.completed;
  //   return true; // 'all' case
  // });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addNewToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const markCompleted = (id: number) => {
    setTodos(
      todos.map((todos) =>
        todos.id === id ? { ...todos, completed: true } : todos
      )
    );
  };

  const filterMap = {
    all: (todos: Todo[]) => todos,
    active: (todos: Todo[]) => todos.filter((todo) => !todo.completed),
    completed: (todos: Todo[]) => todos.filter((todo) => todo.completed),
  };

  const filterTodo: Todo[] = useMemo(() => {
    const filterFunc = filterMap[filter];
    return filterFunc(todos);
  }, [todos, filter]);

  return (
    <div>
      {/* TODO: Replace this with your implementation */}
      <h4>Filtered ToDo List Component</h4>
      <form>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="add todo"
        ></input>
        <button onClick={addNewToDo}>add</button>
      </form>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <ul>
        {filterTodo.map((todo) => (
          <li key={todo.id}>
            <span className={todo.completed ? "completed_todo" : ""}>
              {todo.title}
            </span>{" "}
            <button onClick={() => markCompleted(todo.id)}>Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
