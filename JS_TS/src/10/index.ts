#!/usr/bin/env ts-node
// CLI entry for Task 10 – placeholder only
import { ToDoManager } from "./todo-manager";

async function ends() {
  const element = new ToDoManager();
  await element.init();

  const commands = process.argv[2];
  const arg1 = process.argv[3];
  const arg2 = process.argv[4];

  if (commands === "list") {
    const todo = await element.list();
    console.log(todo);
  } else if (commands === "add") {
    if (!arg1) {
      console.error("Нету титла");
      return;
    } else {
      await element.add(arg1, arg2);
      console.log("Добавлено");
    }
  } else if (commands === "complete") {
    if (!arg1) {
      console.error("нет id");
      return;
    } else {
      const id = parseInt(arg1);
      if (isNaN(id)) {
        console.error("id должен быть числом");
      } else {
        await element.complete(id);
        console.log("статус для id изменен");
      }
    }
  } else {
    console.log("используйте либо add, либо list, либо complete");
  }
}

ends();
