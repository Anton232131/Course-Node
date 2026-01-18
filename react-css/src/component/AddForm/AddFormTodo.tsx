import React, { useState } from "react";
import { AddTodoFormProps } from "../../types";
import styles from "./AddFormTodo.module.css";

const AddFormTodo: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const submitTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={submitTodo} className={styles.add_form}>
      <input
        className={styles.add_input}
        type="text"
        placeholder="Add Todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button type="submit" className={styles.add_button}>
        Submit
      </button>
    </form>
  );
};

export default AddFormTodo;
