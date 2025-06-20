import WebSocket, { WebSocketServer } from 'ws';
import { handleMessage } from '../controllers/messageService';

export function startWebSocketServer(): void {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws: WebSocket) => {
    console.log('connected');

    ws.on('message', (message: string | Buffer) => {
      const msg = message.toString();
      console.log('received:', msg);

      const response = handleMessage(msg);

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(response);
        }
      });
    });

    ws.on('close', () => {
      console.log('disconnected');
    });
  });

  console.log('running on ws://localhost:8080');
}