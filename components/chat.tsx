"use client";

import { Button } from "@/components/ui/button";
import {
  RiSendPlaneFill,
  RiShining2Line,
  RiAttachment2,
  RiMicLine,
  RiLeafLine
} from "@remixicon/react";
import { useRef, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useTimelogStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-messages";
import {TimeLogAgentResponse} from "@/lib/schemas";

type Message = {
    source: string;
    content: string | { thoughts: string } | Record<string, unknown>;
    type: string;
    models_usage?: {
        prompt_tokens: number;
        completion_tokens: number;
    } | null;
};

type TimelogEntry = {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    source: string;
};

type TimelogResponse = {
    thoughts: string;
    response: TimelogEntry[];
};



export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const { setTimelogs } = useTimelogStore();

    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://127.0.0.1:8000/api/v1/ws');

    useEffect(() => {
        if (lastMessage !== null) {
            const data: Message = JSON.parse(lastMessage.data);
            
            if (data.source === 'timelog' && data.type === 'TextMessage') {
                const timelogData: TimelogResponse = JSON.parse(typeof data.content === 'string' ? data.content : JSON.stringify(data.content))
                // TODO: Fix type
                setTimelogs(timelogData.response as unknown as TimeLogAgentResponse[]);
                // Only add thoughts to chat
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
            const formattedMessage = JSON.stringify({
                content: message,
                source: 'user'
            });
            sendMessage(formattedMessage);
            setMessage('');
        }
    };

    return (
        <div className="h-full flex flex-col px-4 w-full">
            <div className="relative grow">
                <div className="max-w-3xl mx-auto mt-6 space-y-6">
                    {/* <div className="text-center my-8">
                        <div className="inline-flex items-center bg-white rounded-full border border-black/[0.08] shadow-sm text-xs font-medium py-1 px-3 text-foreground/80">
                            <RiShining2Line
                                className="me-1.5 text-muted-foreground/70 -ms-1"
                                size={14}
                                aria-hidden="true"
                            />
                            Today
                        </div>
                    </div> */}
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
            {/* Footer */}
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
                        {/* Textarea buttons */}
                        <div className="flex items-center justify-end gap-2 p-3">
                    
                            {/* Right buttons */}
                            <div className="flex items-center gap-2">
                                <Button
                                    className="rounded-full h-8"
                                    onClick={handleSend}
                                    disabled={readyState !== ReadyState.OPEN}
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