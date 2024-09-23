const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, function () {
  console.log("listening on port 3000");
});

/** WS begin */
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws) {
  const numClients = wss.clients.size;
  console.log(numClients, "clients connected");

  wss.broadcast(`Current Visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to the server");
  }

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
/** WS end */
