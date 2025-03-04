"use client";

import { Button } from "@/components/ui/button";
import {
  RiSendPlaneFill,
} from "@remixicon/react";
import { useRef, useEffect, useState } from "react";
import { useTimelogStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";
import { TimeLogAgentResponse } from "@/lib/schemas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Message, TimelogResponse, WebSocketHook } from "../types";
import { WS_URL, sendWebSocketMessage } from "../api/websocket";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const { setTimelogs } = useTimelogStore();
    const queryClient = useQueryClient();

    const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);

    // Use TanStack Query for managing messages
    const { data: chatMessages } = useQuery({
        queryKey: ['messages'],
        queryFn: () => messages,
        initialData: []
    });

    // Mutation for sending messages
    const sendMessageMutation = useMutation({
        mutationFn: (content: string) => {
            const formattedMessage = JSON.stringify({
                content,
                source: 'user'
            });
            return sendMessage(formattedMessage);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        }
    });

    useEffect(() => {
        if (lastMessage !== null) {
            const data: Message = JSON.parse(lastMessage.data);
            
            if (data.source === 'timelog' && data.type === 'TextMessage') {
                const timelogData: TimelogResponse = JSON.parse(typeof data.content === 'string' ? data.content : JSON.stringify(data.content))
                setTimelogs(timelogData.response as unknown as TimeLogAgentResponse[]);
                setMessages(prev => [...prev, {
                    source: data.source,
                    type: data.type,
                    content: { thoughts: timelogData.thoughts },
                    models_usage: data.models_usage
                }]);
            } else {
                setMessages(prev => [...prev, data]);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    const handleSend = () => {
        if (message.trim()) {
            sendMessageMutation.mutate(message);
            setMessage('');
        }
    };

    return (
        <div className="h-full flex flex-col px-4 w-full">
            <div className="relative grow">
                <div className="max-w-3xl mx-auto mt-6 space-y-6">
                    {messages.map((msg, index) => {
                        const messageContent = msg.source === 'user' ? 
                            (typeof msg.content === 'string' ? msg.content : null) :
                            (msg.source === 'timelog' && msg.type === 'TextMessage' && 
                            typeof msg.content === 'object' && 'thoughts' in msg.content ? 
                            String(msg.content.thoughts) : null);
                        
                        return messageContent ? (
                            <ChatMessage key={index} isUser={msg.source === 'user'}>
                                {messageContent}
                            </ChatMessage>
                        ) : null;
                    })}
                    <div ref={messagesEndRef} aria-hidden="true" />
                </div>
            </div>
            <div className="sticky bottom-0 pt-4 md:pt-8">
                <div className="max-w-3xl mx-auto bg-background rounded-[20px] pb-4 md:pb-8">
                    <div className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:bg-muted/50 focus-within:border-input has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
                        <textarea
                            className="flex sm:min-h-[84px] w-full bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none [resize:none]"
                            placeholder="Ask me anything..."
                            aria-label="Enter your prompt"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <div className="flex items-center justify-end gap-2 p-3">
                            <div className="flex items-center gap-2">
                                <Button
                                    className="rounded-full h-8"
                                    onClick={handleSend}
                                    disabled={readyState !== ReadyState.OPEN || sendMessageMutation.isPending}
                                >
                                    <RiSendPlaneFill size={20} /> Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}