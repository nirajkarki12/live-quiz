import { 
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway 
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { WsJwtGuard } from 'src/sockets/guards/ws-jwt.guard';
// Interfaces
import { User } from 'src/users/interfaces/user.interface';
import { Room } from '../interfaces/room.interface';
// Services
import { SocketService } from '../services/socket/socket.service';
import { UsersService } from 'src/users/services/users.service';

@WebSocketGateway() 
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer() server;
  connectedUsers: User[] = [];
  user: User;
  room: Room;

  constructor(
    private socketService: SocketService,
    private userService: UsersService,
  ){}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    // creating and joining users to public
    this.room = await this.socketService.findRoomByName('public');
    if(!this.room) {
      this.room = await this.socketService.createRoom('public');
    }
    this.connectedUsers.push(user);
    await this.socketService.addUsersToRoom(user, this.room.id);
    client.join(this.room.name);

    // Send last messages to the connected user
    const messages = await this.socketService.findMessages(this.room.id, 25);
    client.emit(this.room.name).emit('pre-messages', messages);

    // Send connected Users to all on a public room
    this.server.to(this.room.name).emit('users', {'connectedUsers': this.connectedUsers, room: this.room.name});
    // Send this user connected information to others
    client.to(this.room.name).emit('users-changed', {text: user.name + ' Joined a public room', event: 'joined' });
  }

  async handleDisconnect(client: Socket) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    await this.socketService.removeUsersFromRoom(user, this.room.id);

    const userPos = this.connectedUsers.indexOf(user);

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }
    // Send connected Users to all on a public room
    this.server.to(this.room.name).emit('users', {'connectedUsers': this.connectedUsers, room: this.room.name});
    // Send this user disconnected information to others
    client.to(this.room.name).emit('users-changed', {text: user.name + ' left public room', event: 'left'});
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('add-message')
  async addMessage(client: Socket, message: string) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);
    let roomMessage = await this.socketService.addMessage(message, user, this.room.id); 

    this.server.to(this.room.name).emit('message', roomMessage);
  }

}
