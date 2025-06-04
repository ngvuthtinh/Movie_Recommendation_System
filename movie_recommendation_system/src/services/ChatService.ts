import { ChatMessage } from '../types/Messages.ts'; // Make sure this path is correct

export class ChatService {
    private ws: WebSocket | null = null;
    private messageHandlers: ((message: ChatMessage) => void)[] = [];
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 3;
    private isConnecting = false;
    private isPermanentlyClosed = false;
    private wsUrl: string;
    private initialConnectTimeoutId: ReturnType<typeof setTimeout> | null = null; // For deferring initial connect

    constructor(roomId: string) {
        const roomToken = localStorage.getItem('room_token');
        const userToken = localStorage.getItem('user_token');

        if (!roomToken || !userToken) {
            console.error('ChatService: Missing tokens for WebSocket connection. Cannot connect.');
            this.wsUrl = '';
            this.isPermanentlyClosed = true;
            return;
        }

        this.wsUrl = `ws://localhost:8000/room/${roomId}/chat?room_token=${roomToken}&user_token=${userToken}`;

        // Defer the initial connection attempt slightly.
        // This helps in React StrictMode by allowing the cleanup of the first,
        // short-lived instance to cancel this connection before it happens.
        this.initialConnectTimeoutId = setTimeout(() => {
            this.initialConnectTimeoutId = null; // Clear the timeout ID as it has fired
            if (!this.isPermanentlyClosed) { // Check if disconnect() was called before this timeout
                this.connect();
            } else {
                console.log('ChatService: Initial connect() aborted as service was permanently closed before timeout.');
            }
        }, 0); // 0ms timeout defers execution until after current call stack
    }

    private connect() {
        if (this.isPermanentlyClosed) {
            console.log('ChatService: Connection attempt aborted, service is permanently closed.');
            return;
        }

        if (this.isConnecting || (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING))) {
            console.log('ChatService: WebSocket connection already in progress or active.',
                `isConnecting: ${this.isConnecting}`,
                `readyState: ${this.ws?.readyState}`);
            return;
        }

        this.isConnecting = true;
        console.log('ChatService: Attempting to connect to', this.wsUrl);

        try {
            this.ws = new WebSocket(this.wsUrl);

            this.ws.onopen = () => {
                console.log('ChatService: Connected to chat room successfully.');
                this.reconnectAttempts = 0;
                this.isConnecting = false;
            };

            this.ws.onclose = (event) => {
                if (!this.isPermanentlyClosed) {
                    console.error(`ChatService: WebSocket closed. Code: ${event.code}, Reason: "${event.reason}", Clean: ${event.wasClean}`);
                    this.isConnecting = false;
                    this.handleReconnect();
                } else {
                    console.log('ChatService: WebSocket closed (service was permanently closed by client).');
                }
            };

            this.ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data as string) as ChatMessage;
                    this.messageHandlers.forEach(handler => handler(message));
                } catch (error) {
                    console.error('ChatService: Error parsing incoming message:', error, 'Data:', event.data);
                }
            };

            this.ws.onerror = (errorEvent) => {
                if (!this.isPermanentlyClosed) {
                    console.error('ChatService: WebSocket error occurred:', errorEvent);
                }
                this.isConnecting = false;
            };

        } catch (error) {
            console.error('ChatService: Error creating WebSocket object:', error);
            this.isConnecting = false;
        }
    }

    private handleReconnect() {
        if (this.isPermanentlyClosed) {
            console.log('ChatService: Reconnect aborted, service is permanently closed.');
            return;
        }

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.pow(2, this.reconnectAttempts - 1) * 1000;
            console.log(`ChatService: Reconnecting... Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}. Retrying in ${delay / 1000}s.`);
            setTimeout(() => this.connect(), delay);
        } else {
            console.log('ChatService: Max reconnect attempts reached. Not attempting further reconnections.');
        }
    }

    public sendMessage(messageContent: string) {
        if (this.isPermanentlyClosed) {
            console.error('ChatService: Cannot send message, service is permanently closed.');
            return;
        }
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('ChatService: WebSocket not open. Cannot send message. Current state:', this.ws?.readyState);
            return;
        }
        this.ws.send(JSON.stringify({ message: messageContent }));
    }

    public onMessage(handler: (message: ChatMessage) => void): () => void {
        this.messageHandlers.push(handler);
        return () => {
            this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
        };
    }

    public disconnect() {
        console.log('ChatService: disconnect() called. Permanently closing this service instance.');
        this.isPermanentlyClosed = true;
        this.reconnectAttempts = this.maxReconnectAttempts;

        // If there was a pending initial connect timeout, clear it.
        if (this.initialConnectTimeoutId) {
            clearTimeout(this.initialConnectTimeoutId);
            this.initialConnectTimeoutId = null;
            console.log('ChatService: Cleared pending initial connect timeout.');
        }

        if (this.ws) {
            this.ws.onopen = null;
            this.ws.onclose = null;
            this.ws.onmessage = null;
            this.ws.onerror = null;

            if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
                this.ws.close(1000, "Client disconnected");
            }
            this.ws = null;
        }
        this.isConnecting = false;
        console.log('ChatService: Service instance has been disconnected.');
    }
}