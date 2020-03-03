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
import { Question } from '../../questions/interfaces/question.interface';
import { QuestionSet } from '../../questions/interfaces/questionset.interface';
// Services
import { SocketService } from '../services/socket/socket.service';
import { UsersService } from '../../users/services/users.service';
import { QuestionService } from '../../questions/services/question/question.service';
import { QuizService } from '../../quiz/services/quiz.service';

@WebSocketGateway() 
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer() server;
  connectedUsers: number = 0;
  room: Room;
  quizStarted: Boolean = false;

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
      // if(this.quizStarted) {
      //   this.server.to(client.id).emit('view-only', {viewOnly: true});
      // }
      client.to(this.room.name).emit('users-changed', {text: userName + ' Joined a public room', event: 'joined'});

    } catch (err) {
      console.log(err);
    }
  }

  async handleDisconnect(client: Socket) {
    try {

      const token = client.handshake.query.token;
      const user: User = <User> jwt.decode(token);

      const userName: string = user.name;
      if (!user) throw new WsException('Can\'t Connect to network');

      // await this.socketService.removeUsersFromRoom(user, this.room.id);
      this.connectedUsers--;
      // Send connected Users to all on a public room
      this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
      // Send this user disconnected information to others
      client.to(this.room.name).emit('users-changed', {text: userName + ' left public room', event: 'left', viewOnly: true});

    } catch (err) {
      console.log(err);
    }
  }

  // Sends chat messages
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('add-message')
  async addMessage(client: Socket, message: string) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);
    let roomMessage = await this.socketService.addMessage(message, user, this.room.id); 

    await this.server.to(this.room.name).emit('message', roomMessage);
  }

  // Subscribe through backend for starting and sending questions
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('quizEvent')
  async quizEvent(client: Socket, data: any) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    if(data.set) {
      // this.quizStarted = true;
      await this.server.to(this.room.name).emit('quiz-started', {currentTime: new Date()}); // Quiz started
    }else if(data.question) {
      await this.server.to(this.room.name).emit('quiz-question', {question: data.question, timer: 10000}); // Sends Questions
    }else{
      this.quizStarted = false;
    }
  }

  // Subscribe through client when user inputs given option
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('quiz-option')
  async quizAnswer(client: Socket, data: any) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    const question = await this.questionService.findOneById(data._id);
    
    let isCorrect = false;

    if (data.option === question.answer) isCorrect = true;

    // Adding log of quiz
    await this.quizService.create({
        user:user.userId,
        question:question.id,
        answer:data.option,
        isCorrect:isCorrect
    });

    if(!isCorrect) await this.server.to(client.id).emit('view-only', {viewOnly: true}); // User mode changed to View only
  }

  // request for result of every question from backend
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('result-request')
  async questionResult(client: Socket, data: any) {
    const questionResult = await this.quizService.getQuizResults(data.question);

    await this.server.to(this.room.name).emit('question-result', {question: questionResult});
  }

  // quiz result for client
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('quiz-ended')
  async quizEnded(client: Socket, set: QuestionSet) {
    const result = await this.quizService.getFinalResults(set);

    await this.server.to(this.room.name).emit('quiz-final-result', result);
  }

  // timeout event
  // Subscribe through client if user failed to answer the question on a given period of time
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('quiz-timeout')
  async quizTimeOut(client: Socket, questionId: string) {
    const token = client.handshake.query.token;
    const user: User = <User> jwt.decode(token);

    let question = await this.questionService.findOneById(questionId);
    if(!question) throw new WsException('Question not found');

    await this.server.to(client.id).emit('view-only', {viewOnly: true}); // User mode changed to View only
    // Adding log of quiz
    await this.quizService.create({
        user:user.userId,
        question:question.id,
        isTimeOut: true
    });
  }

}
