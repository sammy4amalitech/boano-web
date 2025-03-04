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

export type TimelogEntry = {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    source: string;
};

export type TimelogResponse = {
    thoughts: string;
    response: TimelogEntry[];
};

export type WebSocketHook = {
    sendMessage: (message: string) => void;
    lastMessage: MessageEvent | null;
    readyState: number;
};