import React from "react";
import { TodoListProps } from "../types";

const ListToDo: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map((element) => (
        <li key={element.id}>
          {element.title} - {element.completed ? "completed" : "not completed"}
        </li>
      ))}
    </ul>
  );
};

export default ListToDo;
