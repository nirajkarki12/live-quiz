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
    this.user = <User> jwt.decode(token);

    // creating and joining users to public
    this.room = await this.socketService.findRoomByName('public');
    if(!this.room) {
      this.room = await this.socketService.createRoom('public');
    }
    this.connectedUsers.push(this.user);
    await this.socketService.addUsersToRoom(this.user, this.room.id);
    client.join(this.room.name);

    this.server.to(this.room.name).emit('users', {'connectedUsers': this.connectedUsers, room: this.room.name});
    client.to(this.room.name).emit('users-changed', {text: this.user.name + ' Joined a public room', event: 'joined' });
  }

  async handleDisconnect(client: Socket) {
    let abc = await this.socketService.removeUsersFromRoom(this.user, this.room.id);
    console.log('abc', abc);
    const userPos = this.connectedUsers.indexOf(this.user);

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }
    this.server.to(this.room.name).emit('users', {'connectedUsers': this.connectedUsers, room: this.room.name});
    client.to(this.room.name).emit('users-changed', {text: this.user.name + ' left public room', event: 'left'});
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('add-message')
  async addMessage(client: Socket, data) {
    await this.socketService.addMessage(data.message, this.user, this.room.id); 

    this.server.to(this.room.name).emit('message', {text: data.message, from: this.user.name, isAdmin: this.user.isAdmin, created: new Date()});
  }

}
