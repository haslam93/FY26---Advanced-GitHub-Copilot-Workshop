"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { TaskStore } = require("../src/task-store");

test("add stores a normalized task", () => {
  const store = new TaskStore();

  const task = store.add("  Demo Copilot review  ");

  assert.equal(task.title, "Demo Copilot review");
  assert.equal(task.completed, false);
  assert.equal(store.list().length, 3);
});

test("add rejects short titles", () => {
  const store = new TaskStore();

  assert.throws(() => store.add("x"), /at least three characters/);
});

test("toggle returns null for an unknown task", () => {
  const store = new TaskStore();

  assert.equal(store.toggle(999), null);
});

test("remove deletes an existing task", () => {
  const store = new TaskStore();

  assert.equal(store.remove(1), true);
  assert.equal(store.list().some((task) => task.id === 1), false);
});
