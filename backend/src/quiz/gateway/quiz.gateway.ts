import { 
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    SubscribeMessage,
    WebSocketGateway, 
    WsException
  } from '@nestjs/websockets';
  import { UseGuards } from '@nestjs/common';
  import * as jwt from 'jsonwebtoken';
  import { Socket } from 'socket.io';
  import { WsJwtGuard } from 'src/sockets/guards/ws-jwt.guard';
  // Interfaces
  import { User } from 'src/users/interfaces/user.interface';
  // Services
  import { UsersService } from 'src/users/services/users.service';
  
  @WebSocketGateway() 
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect  {
    @WebSocketServer() server;
    connectedUsers: number = 0;
  
    constructor(
      private userService: UsersService,
    ){}
  
    async handleConnection(client: Socket) {
      try {
        const token = client.handshake.query.token;
        const user: User = <User> jwt.decode(token);
        if (!user) throw new WsException('Can\'t Connect to network');
        const userName: string = user.name;
  
        // creating and joining users to public
        // this.room = await this.socketService.findRoomByName('public');
        // if(!this.room) {
        //   this.room = await this.socketService.createRoom('public');
        // }
        // // await this.socketService.addUsersToRoom(user, this.room.id);
        // this.connectedUsers++;
        // client.join(this.room.name);
  
        // Send last messages to the connected user
        // const messages = await this.socketService.findMessages(this.room.id, 40);
        // client.emit(this.room.name).emit('pre-messages', messages);
  
        // // Send connected Users to all on a public room
        // this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
        // // Send this user connected information to others
        // client.to(this.room.name).emit('users-changed', {text: userName + ' Joined a public room', event: 'joined' });
  
      } catch (err) {
        console.log(err);
      }
    }
  
    async handleDisconnect(client: Socket) {
      try {
  
        const token = client.handshake.query.token;
        const user: User = <User> jwt.decode(token);
        console.log('logged out token', token);
        console.log('logged out user', user);
  
        const userName: string = user.name;
        if (!user) throw new WsException('Can\'t Connect to network');
  
        // await this.socketService.removeUsersFromRoom(user, this.room.id);
        this.connectedUsers--;
        // const userPos = this.connectedUsers.indexOf(user);
  
        // if (userPos > -1) {
        //   this.connectedUsers = [
        //     ...this.connectedUsers.slice(0, userPos),
        //     ...this.connectedUsers.slice(userPos + 1)
        //   ];
        // }
        // Send connected Users to all on a public room
        // this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
        // // Send this user disconnected information to others
        // client.to(this.room.name).emit('users-changed', {text: userName + ' left public room', event: 'left'});
  
      } catch (err) {
        console.log(err);
      }
    }
  
    @UseGuards(WsJwtGuard)
    @SubscribeMessage('add-message')
    async addMessage(client: Socket, message: string) {
    //   const token = client.handshake.query.token;
    //   const user: User = <User> jwt.decode(token);
    //   let roomMessage = await this.socketService.addMessage(message, user, this.room.id); 
  
    //   await this.server.to(this.room.name).emit('message', roomMessage);
    }
  
  }
  