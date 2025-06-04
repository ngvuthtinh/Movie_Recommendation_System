export interface ChatMessage {
    type: string; // "system" or "chat"
    content: string;
    timestamp: string;
    user: {
        id: string | null;
        display_name: string;
    };
}