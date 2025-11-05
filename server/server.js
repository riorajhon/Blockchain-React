// server.js
import { WebSocketServer } from 'ws';

const PORT = 3000; // separate from React frontend port
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}/`);

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
