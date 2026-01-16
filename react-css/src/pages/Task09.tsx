import React from "react";
import TaskWrapper from "./TaskWrapper";
import { Card } from "../solutions/task-09/Card";
import { FilteredToDoList } from "../solutions/task-05/FilteredToDoList";

const Task09: React.FC = () => (
  <TaskWrapper title="Task 9: Card Component">
    <Card>
      <h3>Card Content</h3>
      <p>This is content wrapped in a Card component.</p>
      <button>Click me</button>
    </Card>
    <Card>
      <h3>Card content 2</h3>
      <p>Hello world!!!</p>
      <button>click me</button>
      <form>
        <input type="text"></input>
      </form>
    </Card>
    <Card>
      <FilteredToDoList />
    </Card>
  </TaskWrapper>
);

export default Task09;
