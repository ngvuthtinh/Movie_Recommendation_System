import { ChatMessage } from '../types/Messages.ts';

export class ChatService {
    private ws: WebSocket | null = null;
    private messageHandlers: ((message: ChatMessage) => void)[] = [];
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 3;
    private isConnecting = false;
    private isPermanentlyClosed = false; // New flag
    private wsUrl: string; // Store wsUrl for reconnections

    constructor(roomId: string) {
        const roomToken = localStorage.getItem('room_token');
        const userToken = localStorage.getItem('user_token');

        if (!roomToken || !userToken) {
            console.error('Missing tokens for WebSocket connection');
            // Consider throwing an error or having a more robust way to signal this failure
            this.wsUrl = ''; // Or handle invalid state
            this.isPermanentlyClosed = true; // Prevent connection attempts if tokens are missing
            return;
        }

        this.wsUrl = `ws://localhost:8000/room/${roomId}/chat?room_token=${roomToken}&user_token=${userToken}`;
        this.connect();
    }

    private connect() {
        if (this.isPermanentlyClosed) {
            console.log('ChatService: Connection attempt aborted, service is permanently closed.');
            return;
        }

        if (this.isConnecting || (this.ws && this.ws.readyState !== WebSocket.CLOSED)) {
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
                console.log('ChatService: Connected to chat room');
                this.reconnectAttempts = 0;
                this.isConnecting = false; // CORRECTED: connection process finished
            };

            this.ws.onclose = (event) => {
                // Only log and attempt reconnect if not permanently closed
                if (!this.isPermanentlyClosed) {
                    console.error('ChatService: WebSocket closed:', event.code, event.reason);
                    this.isConnecting = false;
                    this.handleReconnect();
                } else {
                    console.log('ChatService: WebSocket closed (service was permanently closed).');
                }
            };

            this.ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data) as ChatMessage;
                    this.messageHandlers.forEach(handler => handler(message));
                } catch (error) {
                    console.error('ChatService: Error parsing message:', error);
                }
            };

            this.ws.onerror = (error) => {
                // Only log if not permanently closed
                if (!this.isPermanentlyClosed) {
                    console.error('ChatService: WebSocket error:', error);
                    // Note: onclose will usually follow an error, triggering reconnect logic there.
                    // If onclose doesn't fire, this error might leave the socket in a broken state
                    // without an explicit reconnect attempt from here.
                }
                this.isConnecting = false; // Error means connection attempt failed or existing connection broke
            };

        } catch (error) {
            console.error('ChatService: Error creating WebSocket:', error);
            this.isConnecting = false;
            // If creation fails, consider if a retry mechanism is needed here,
            // or if it should rely on an external call to connect() again.
            // For now, it won't automatically retry if the new WebSocket() constructor itself throws.
        }
    }

    private handleReconnect() {
        if (this.isPermanentlyClosed) {
            console.log('ChatService: Reconnect aborted, service is permanently closed.');
            return;
        }

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`ChatService: Reconnecting... Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
            const delay = Math.pow(2, this.reconnectAttempts -1) * 1000; // Exponential backoff (1s, 2s, 4s)
            setTimeout(() => this.connect(), delay);
        } else {
            console.log('ChatService: Max reconnect attempts reached.');
        }
    }

    public sendMessage(message: string) {
        if (this.isPermanentlyClosed) {
            console.error('ChatService: Cannot send message, service is permanently closed.');
            return;
        }
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('ChatService: WebSocket not open. Current state:', this.ws?.readyState);
            // Optional: Queue message or attempt to connect if appropriate
            return;
        }
        this.ws.send(JSON.stringify({ message })); // Assuming your backend expects {"message": "your_message"}
    }

    public onMessage(handler: (message: ChatMessage) => void) {
        this.messageHandlers.push(handler);
        // Optional: return an unsubscribe function
        // return () => {
        //     this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
        // };
    }

    public disconnect() {
        console.log('ChatService: Disconnecting...');
        this.isPermanentlyClosed = true;
        this.reconnectAttempts = this.maxReconnectAttempts; // Prevent handleReconnect from trying again

        if (this.ws) {
            // Remove event handlers to prevent them from firing after explicit disconnect
            this.ws.onopen = null;
            this.ws.onclose = null; // Crucial to prevent onclose triggering handleReconnect
            this.ws.onmessage = null;
            this.ws.onerror = null;

            if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
                this.ws.close();
            }
            this.ws = null;
        }
        this.isConnecting = false;
        console.log('ChatService: Disconnected.');
    }
}