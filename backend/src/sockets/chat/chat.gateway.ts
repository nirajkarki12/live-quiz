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
import { WsJwtGuard } from '../../sockets/guards/ws-jwt.guard';
// Interfaces
import { User } from '../../users/interfaces/user.interface';
import { Room } from '../interfaces/room.interface';
// Services
import { SocketService } from '../services/socket/socket.service';
import { UsersService } from '../../users/services/users.service';
import { QuestionService } from '../../questions/services/question/question.service';
import { QuizService } from 'src/quiz/services/quiz.service';

@WebSocketGateway() 
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer() server;
  connectedUsers: number = 0;
  room: Room;

  constructor(
    private socketService: SocketService,
    private userService: UsersService,
    private questionService: QuestionService,
    private quizService: QuizService
  ){}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token;
      const user: User = <User> jwt.decode(token);
      if (!user) throw new WsException('Can\'t Connect to network');
      const userName: string = user.name;

      // creating and joining users to public
      this.room = await this.socketService.findRoomByName('public');
      if(!this.room) {
        this.room = await this.socketService.createRoom('public');
      }
      // await this.socketService.addUsersToRoom(user, this.room.id);
      this.connectedUsers++;
      client.join(this.room.name);

      // Send last messages to the connected user
      const messages = await this.socketService.findMessages(this.room.id, 40);
      client.emit(this.room.name).emit('pre-messages', messages);

      // Send connected Users to all on a public room
      this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
      // Send this user connected information to others
      client.to(this.room.name).emit('users-changed', {text: userName + ' Joined a public room', event: 'joined' });

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
      this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
      // Send this user disconnected information to others
      client.to(this.room.name).emit('users-changed', {text: userName + ' left public room', event: 'left'});

    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('add-message')
  async addMessage(client: Socket, message: string) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);
    let roomMessage = await this.socketService.addMessage(message, user, this.room.id); 

    await this.server.to(this.room.name).emit('message', roomMessage);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('quizEvent')
  async quizEvent(client: Socket, data: any) {
    console.log(data);
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);
    // let roomMessage = await this.socketService.addMessage(message, user, this.room.id); 
    if(data.set) {
      await this.server.to(this.room.name).emit('quiz-started', {currentTime: new Date()});
    }else if(data.question) {
      await this.server.to(this.room.name).emit('quiz-question', {question: data.question});
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('quiz-option')
  async quizAnswer(client: Socket, data: any) {
    console.log(data);
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    const question = await this.questionService.findOneById(data._id);

    let isCorrect = false;

    if(data.option === question.answer)
    {
      isCorrect = true;
    }
    
    await this.quizService.create({
                  user:user,
                  question:question,
                  answer:data.option,
                  isCorrect:isCorrect
                })
    // let roomMessage = await this.socketService.addMessage(message, user, this.room.id); 
    await this.server.to(this.room.name).emit('quiz-answer', {question: question, isCorrect: isCorrect});
  }

  // request for result of every question
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('result-request')
  async questionResult(client: Socket, data: any) {
    console.log('result-request',data);
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    const questionResult = await this.quizService.count(data.question);
    
    console.log('result',questionResult);
    await this.server.to(this.room.name).emit('question-result', questionResult);
  }

}
