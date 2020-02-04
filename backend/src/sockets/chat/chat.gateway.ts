import { 
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway 
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsJwtGuard } from 'src/sockets/guards/ws-jwt.guard';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  nicknames: Map<string, string> = new Map();

  async handleConnection(client: Socket) {
    
    client.emit('users', 'connected ' + client);
  }

  handleDisconnect(client: Socket) { 
    client.server.emit('users-changed', {user: this.nicknames[client.id], event: 'left'});
    this.nicknames.delete(client.id);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('set-nickname') 
  setNickname(client: Socket, nickname: string) {
    this.nicknames[client.id] = nickname;
    client.server.emit('users-changed', {user: nickname, event: 'joined'}); 
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('add-message')
  addMessage(client: Socket, message) {
    client.server.emit('message', {text: message.text, from: this.nicknames[client.id], created: new Date()});
  }
}
