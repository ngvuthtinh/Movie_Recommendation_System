import { ChatMessage } from '../types/Messages.ts';

export class ChatService {
    private ws: WebSocket | null = null;
    private messageHandlers: ((message: ChatMessage) => void)[] = [];
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 3;
    private isConnecting = false;
    private isConnected = false;
    private roomId: string;

    constructor(roomId: string) {
        this.roomId = roomId;
        this.initializeConnection();
    }

    private initializeConnection() {
        const roomToken = localStorage.getItem('room_token');
        const userToken = localStorage.getItem('user_token');

        if (!roomToken || !userToken) {
            console.error('Missing tokens for WebSocket connection');
            window.location.href = '/login'; // Redirect to login
            return;
        }

        const wsUrl = `ws://localhost:8000/room/${this.roomId}/chat?room_token=${roomToken}&user_token=${userToken}`;
        this.connect(wsUrl);
    }

    private connect(wsUrl: string) {
        if (this.isConnecting || this.isConnected || (this.ws && this.ws.readyState !== WebSocket.CLOSED)) {
            console.log('Connection already in progress or active, skipping:', this.isConnecting, this.isConnected, this.ws?.readyState);
            return;
        }

        this.isConnecting = true;
        console.log('Starting connection to:', wsUrl);

        try {
            this.ws = new WebSocket(wsUrl);
            console.log('WebSocket created');

            this.ws.onopen = () => {
                console.log('Connected to chat room');
                this.isConnected = true;
                this.isConnecting = false;
                this.reconnectAttempts = 0;
            };

            this.ws.onclose = (event) => {
                console.error('WebSocket closed:', event.code, event.reason, new Date().toISOString());
                this.isConnected = false;
                this.isConnecting = false;
                this.ws = null; // Clear WebSocket on close
                if (event.code === 1008) { // Invalid/expired tokens
                    console.error('Tokens invalid, redirecting to login');
                    window.location.href = '/login';
                } else if (this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.handleReconnect(wsUrl);
                }
            };

            this.ws.onmessage = (event) => {
                console.log('Message received:', event.data);
                try {
                    const message = JSON.parse(event.data) as ChatMessage;
                    this.messageHandlers.forEach(handler => handler(message));
                } catch (error) {
                    console.error('Error parsing message:', error, event.data);
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnecting = false;
            };
        } catch (error) {
            console.error('Error creating WebSocket:', error);
            this.isConnecting = false;
        }
    }

    private handleReconnect(wsUrl: string) {
        if (this.reconnectAttempts < this.maxReconnectAttempts && !this.isConnecting && !this.isConnected) {
            this.reconnectAttempts++;
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            setTimeout(() => this.connect(wsUrl), 1000 * this.reconnectAttempts);
        } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnect attempts reached, redirecting to login');
            window.location.href = '/login';
        }
    }

    public sendMessage(message: string) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket not open:', this.ws?.readyState);
            return;
        }
        this.ws.send(JSON.stringify({ message }));
    }

    public onMessage(handler: (message: ChatMessage) => void) {
        this.messageHandlers.push(handler);
    }

    public disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.isConnected = false;
            this.isConnecting = false;
            this.reconnectAttempts = 0;
        }
    }
}