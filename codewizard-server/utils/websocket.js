import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

// Create a global array to store connected WebSocket clients
const connectedClients = [];

export function setupWebSocketServer(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    console.log("A user connected via WebSocket.", connectedClients.length + 1);

    const token = req.url.split("?")[1].split("=")[1];

    if (token) {
      // eslint-disable-next-line no-undef
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        connection.userId = user.id;
      });
    }
    connectedClients.push(connection);

    connection.on("close", () => {
      console.log("A user disconnected.");
      // Remove the disconnected client from the array
      connectedClients.splice(connectedClients.indexOf(connection), 1);
    });
  });

  return wss;
}

// const wss = new WebSocketServer({ server });

// wss.on("connection", (connection, req) => {
//   // const regex = /auth\.session-token=([^;]*)/;
//   // const match = req.headers.cookie.match(regex);
//   // console.log(match[1]);
//   // const token = jwt.verify(match[1], "justasecret");
//   const token = req.url.split("?")[1].split("=")[1];

//   // connection.on("message", (message) => {
//   //   console.log("received: %s", message);
//   // });

//   console.log("number of connection to wss: ", [...wss.clients].length);
// });

// function to broadcast updates to all connected clients
export function broadcastUpdate() {
  connectedClients.forEach((client) => {
    client.send("refresh_forum");
  });
}

// function to broadcast updates to all connected clients except for the user with the given userId
export function broadcastUpdateExcept(userId) {
  connectedClients.forEach((client) => {
    if (client.userId !== userId) {
      client.send("refresh_forum");
    }
  });
}
