"use strict";

class TaskStore {
  constructor() {
    this.tasks = [
      { id: 1, title: "Try inline completions", completed: true },
      { id: 2, title: "Ask Copilot to add a filter", completed: false },
    ];
    this.nextId = 3;
  }

  list() {
    return this.tasks.map((task) => ({ ...task }));
  }

  add(title) {
    if (typeof title !== "string" || title.trim().length < 3) {
      throw new TypeError("Task title must contain at least three characters.");
    }

    const task = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
    };

    this.tasks.push(task);
    return { ...task };
  }

  toggle(id) {
    const task = this.tasks.find((candidate) => candidate.id === id);
    if (!task) {
      return null;
    }

    task.completed = !task.completed;
    return { ...task };
  }

  remove(id) {
    const index = this.tasks.findIndex((candidate) => candidate.id === id);
    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }
}

module.exports = { TaskStore };
