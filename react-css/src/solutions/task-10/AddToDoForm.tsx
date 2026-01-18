import React, { useMemo, useState } from "react";
import { Todo } from "../../types";
import AddFormTodo from "../../component/AddForm/AddFormTodo";
import TodoList from "../../component/TodoList/TodoList";
import styles from "./AddToDoForm.module.css";

/**
 * Task 10: AddToDoForm Component
 *
 * Theory: Controlled Components and Form Handling
 *
 * Controlled components are React components where the form data is handled by the component's state.
 * This gives you full control over the form's behavior and makes it easier to validate and process data.
 *
 * Controlled vs Uncontrolled Components:
 *
 * Controlled Components:
 * - Form data is stored in component state
 * - Value is set by state, onChange updates state
 * - Example: <input value={value} onChange={setValue} />
 * - Benefits: Full control, easy validation, predictable behavior
 *
 * Uncontrolled Components:
 * - Form data is handled by the DOM
 * - Use refs to access form values
 * - Example: <input ref={inputRef} />
 * - Benefits: Less code, better performance for simple forms
 *
 * Form Handling Best Practices:
 *
 * 1. Prevent Default Behavior:
 *    - Use event.preventDefault() in onSubmit
 *    - Prevents page reload on form submission
 *    - Example: const handleSubmit = (e) => { e.preventDefault(); }
 *
 * 2. Input Validation:
 *    - Validate on change or submit
 *    - Show error messages to users
 *    - Disable submit button if form is invalid
 *
 * 3. Form State Management:
 *    - Track multiple form fields in state
 *    - Use object to store form data
 *    - Example: const [formData, setFormData] = useState({ title: '', description: '' })
 *
 * 4. Form Submission:
 *    - Handle submission in onSubmit handler
 *    - Process form data
 *    - Clear form after successful submission
 *
 * Common Form Patterns:
 *
 * 1. Single Input:
 *    - Track single value in state
 *    - Simple and straightforward
 *
 * 2. Multiple Inputs:
 *    - Use object to store all form data
 *    - Update specific fields with spread operator
 *    - Example: setFormData({...formData, title: value})
 *
 * 3. Dynamic Forms:
 *    - Add/remove form fields dynamically
 *    - Use arrays to store multiple items
 *
 * 4. Form Validation:
 *    - Track validation state separately
 *    - Show/hide error messages
 *    - Disable submit when invalid
 *
 * Key Concepts:
 * - Use controlled components for complex forms
 * - Always prevent default form submission
 * - Validate input data
 * - Provide user feedback for errors
 * - Clear form after successful submission
 */
export const AddToDoForm: React.FC = () => {
  // TODO: Implement the AddToDoForm component
  //
  // Requirements:
  // 1. Create a controlled form with input field
  // 2. Add a submit button
  // 3. Handle form submission properly
  // 4. Clear the form after submission
  // 5. Validate that input is not empty
  //
  // Example implementation:
  // const [title, setTitle] = useState('');
  // const [todos, setTodos] = useState<Todo[]>([]);
  //
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!title.trim()) return;
  //
  //   const newTodo: Todo = {
  //     id: Date.now(),
  //     title: title.trim(),
  //     completed: false
  //   };
  //
  //   setTodos([...todos, newTodo]);
  //   setTitle('');
  // };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (title: string) => {
    if (title.trim() === "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const markCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
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

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const taskText = activeCount === 1 ? "active todo" : "active todos";

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      {/* TODO: Replace this with your implementation */}
      <h4>Add ToDo Form Component</h4>
      <AddFormTodo onAdd={addTodo} />
      <div className={styles.filter}>
        <button
          className={`${styles.filter_btn} ${filter === "all" ? styles.active : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`${styles.filter_btn} ${filter === "active" ? styles.active : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`${styles.filter_btn} ${filter === "completed" ? styles.active : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <p>
        {activeCount} {taskText}
      </p>

      <TodoList
        todos={filterTodo}
        onComplete={markCompleted}
        onRemove={removeTodo}
      />
    </div>
  );
};
