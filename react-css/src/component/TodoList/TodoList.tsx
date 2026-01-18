import React from "react";
import { TodoLists } from "../../types";
import TodoListItems from "../TodoListItem/TodoListItem";

const TodoList: React.FC<TodoLists> = ({ todos, onComplete, onRemove }) => {
  return (
    <ul style={{ padding: "0px" }}>
      {todos.map((todo) => (
        <TodoListItems
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default TodoList;
