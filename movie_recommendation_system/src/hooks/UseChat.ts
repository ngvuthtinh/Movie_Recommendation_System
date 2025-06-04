import { useState, useEffect, useRef } from 'react';
import { ChatService } from '../services/ChatService'; // Adjust path if necessary
import { ChatMessage } from '../types/Messages.ts'; // Adjust path if necessary

export function useChat(roomId: string) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const chatServiceRef = useRef<ChatService | null>(null);

    useEffect(() => {
        console.log(`useChat: useEffect for roomId: ${roomId} - Setting up ChatService.`);

        const service = new ChatService(roomId);
        chatServiceRef.current = service;

        const unsubscribe = service.onMessage((message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            console.log(`useChat: useEffect cleanup for roomId: ${roomId} - Disconnecting ChatService.`);
            // service.disconnect() is crucial here. It will now also handle
            // clearing the initialConnectTimeoutId if the service is disconnected
            // before the initial connection attempt.
            service.disconnect();
            chatServiceRef.current = null;
            unsubscribe();
        };
    }, [roomId]);

    const sendMessage = (messageContent: string) => {
        if (!chatServiceRef.current) {
            console.error("useChat: ChatService not available to send message.");
            return;
        }
        chatServiceRef.current.sendMessage(messageContent);
    };

    return { messages, sendMessage };
}