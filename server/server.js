// server.js
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import router from './router.js';

const PORT = 3005; // separate from React frontend port

// Create an Express app and use external router
const app = express();
// Middleware: enable CORS and JSON body parsing for API
app.use(cors());
app.use(express.json());
app.use('/', router);

// Create an HTTP server from the Express app and attach the WebSocket server to it
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

server.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}/`);
  console.log(`WebSocket server running on ws://localhost:${PORT}/`);
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send a welcome message
  ws.send(JSON.stringify({ message: 'Hello from WebSocket server!' }));

  // Handle messages from client
  ws.on('message', (data) => {
    console.log('Received from client:', data.toString());

    // Echo message back
    ws.send(JSON.stringify({ message: `Server received: ${data}` }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
