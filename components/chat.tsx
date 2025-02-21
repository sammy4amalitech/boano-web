"use client";

import { Button } from "@/components/ui/button";
import {
  RiSendPlaneFill,
} from "@remixicon/react";
import { useRef, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useTimelogStore } from "@/lib/store";

type Message = {
    source: string;
    content: any;
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
                const timelogData: TimelogResponse = JSON.parse(data.content);
                setTimelogs(timelogData.response);
                // Add thoughts to chat
                setMessages(prev => [...prev, {
                    ...data,
                    content: timelogData.thoughts
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
        <div className="h-full flex flex-col px-4 ">
            <div className="sticky bottom-0 pt-4 md:pt-8">
                <div className="max-w-3xl mx-auto bg-background rounded-[20px] pb-4 md:pb-8">
                    <div
                        className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:bg-muted/50 focus-within:border-input has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
              <div className="flex flex-col flex-1 overflow-y-auto p-4">
                  {messages.map((msg, index) => (
                      <div key={index} className="mb-4 p-3 bg-muted/30 rounded-lg">
                          {typeof msg.content === 'string' ? msg.content : 
                           msg.type === 'ToolCallSummaryMessage' ? JSON.stringify(msg.content) :
                           msg.type === 'ToolCallRequestEvent' ? 'Processing request...' :
                           msg.type === 'ToolCallExecutionEvent' ? 'Executing...' :
                           JSON.stringify(msg.content)}
                      </div>
                  ))}
                  <div ref={messagesEndRef} />
              </div>
              <textarea
                  className="flex sm:min-h-[84px] w-full bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none [resize:none]"
                  placeholder="How can I help..."
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
                            {/*/!* Left buttons *!/*/}
                            {/*<div className="flex items-center gap-2">*/}
                            {/*    <Button*/}
                            {/*        variant="outline"*/}
                            {/*        size="icon"*/}
                            {/*        className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"*/}
                            {/*    >*/}
                            {/*        <RiAttachment2*/}
                            {/*            className="text-muted-foreground/70"*/}
                            {/*            size={20}*/}
                            {/*            aria-hidden="true"*/}
                            {/*        />*/}
                            {/*        <span className="sr-only">Attach</span>*/}
                            {/*    </Button>*/}
                            {/*    <Button*/}
                            {/*        variant="outline"*/}
                            {/*        size="icon"*/}
                            {/*        className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"*/}
                            {/*    >*/}
                            {/*        <RiMicLine*/}
                            {/*            className="text-muted-foreground/70"*/}
                            {/*            size={20}*/}
                            {/*            aria-hidden="true"*/}
                            {/*        />*/}
                            {/*        <span className="sr-only">Audio</span>*/}
                            {/*    </Button>*/}
                            {/*    <Button*/}
                            {/*        variant="outline"*/}
                            {/*        size="icon"*/}
                            {/*        className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"*/}
                            {/*    >*/}
                            {/*        <RiLeafLine*/}
                            {/*            className="text-muted-foreground/70"*/}
                            {/*            size={20}*/}
                            {/*            aria-hidden="true"*/}
                            {/*        />*/}
                            {/*        <span className="sr-only">Action</span>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            {/* Right buttons */}
                            <div className="flex items-center gap-2">

                                <Button 
                                    className="rounded-full h-8"
                                    onClick={handleSend}
                                    disabled={readyState !== ReadyState.OPEN}
                                >
                                     <RiSendPlaneFill
                                            size={20}
                                     /> Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}