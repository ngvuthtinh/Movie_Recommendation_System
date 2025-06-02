import { useState, useEffect } from 'react';
import { ChatService } from '../services/ChatService';
import { ChatMessage } from '../types/Messages.ts';

export function useChat(roomId: string) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatService, setChatService] = useState<ChatService | null>(null);

    useEffect(() => {
        const service = new ChatService(roomId);

        service.onMessage((message) => {
            setMessages(prev => [...prev, message]);
        });

        setChatService(service);

        return () => {
            service.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message: string) => {
        chatService?.sendMessage(message);
    };

    return { messages, sendMessage };
}