import React from "react";
import { TodoItemProps } from "../types";

const ItemToDo: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <p>
      {todo.title} (
      <span className={todo.completed ? "completed_todo" : "uncompleted_todo"}>
        {todo.completed ? "completed" : "not completed"}
      </span>
      )
    </p>
  );
};

export default ItemToDo;
