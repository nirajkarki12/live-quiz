import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    nicknames: Map<string, string>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    setNickname(client: Socket, nickname: string): void;
    addMessage(client: Socket, message: any): void;
}
