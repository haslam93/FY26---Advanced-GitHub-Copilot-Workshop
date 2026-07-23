"use strict";

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { TaskStore } = require("./task-store");

const port = Number(process.env.PORT || 3000);
const store = new TaskStore();
const indexPath = path.join(__dirname, "..", "public", "index.html");

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/") {
    const html = await fs.readFile(indexPath, "utf8");
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(html);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/tasks") {
    sendJson(response, 200, store.list());
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/tasks") {
    try {
      const body = await readJson(request);
      sendJson(response, 201, store.add(body.title));
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  const taskMatch = url.pathname.match(/^\/api\/tasks\/(\d+)$/);
  if (taskMatch && request.method === "PATCH") {
    const task = store.toggle(Number(taskMatch[1]));
    sendJson(response, task ? 200 : 404, task || { error: "Task not found." });
    return;
  }

  if (taskMatch && request.method === "DELETE") {
    const removed = store.remove(Number(taskMatch[1]));
    sendJson(response, removed ? 200 : 404, removed ? { removed: true } : { error: "Task not found." });
    return;
  }

  sendJson(response, 404, { error: "Route not found." });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    sendJson(response, 500, { error: "Unexpected server error." });
  });
});

server.listen(port, () => {
  console.log(`Workshop demo running at http://localhost:${port}`);
});
