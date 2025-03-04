import { WebSocket } from 'ws';

export type Message = {
    source: string;
    content: string | { thoughts: string } | Record<string, unknown>;
    type: string;
    models_usage?: {
        prompt_tokens: number;
        completion_tokens: number;
    } | null;
};

export const WS_URL = 'ws://127.0.0.1:8000/api/v1/ws';

export const sendWebSocketMessage = (ws: WebSocket, message: string) => {
    const formattedMessage = JSON.stringify({
        content: message,
        source: 'user'
    });
    ws.send(formattedMessage);
};