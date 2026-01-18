import React from "react";
import { TodoListItem } from "../../types";
import styles from "./TodoListItem.module.css";

const TodoListItems: React.FC<TodoListItem> = ({
  todo,
  onComplete,
  onRemove,
}) => {
  const titleCl = `${styles.title} ${todo.completed ? styles.completed : ""}`;
  return (
    <li key={todo.id} className={styles.item}>
      <span className={titleCl}>{todo.title}</span>
      <div className={styles.itemButtons}>
        <button
          className={styles.bnt_compl}
          onClick={() => onComplete(todo.id)}
        >
          Completed
        </button>
        <button
          className={styles.bnt_del}
          type="button"
          onClick={() => onRemove(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoListItems;
