import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Room } from '../interfaces/room.interface';
import { SocketService } from '../services/socket/socket.service';
import { UsersService } from '../../users/services/users.service';
import { QuestionService } from '../../questions/services/question/question.service';
import { QuestionsetService } from '../../questions/services/questionset/questionset.service';
import { QuizService } from '../../quiz/services/quiz.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private socketService;
    private userService;
    private questionService;
    private questionSetService;
    private quizService;
    server: any;
    connectedUsers: number;
    room: Room;
    quizStarted: Boolean;
    constructor(socketService: SocketService, userService: UsersService, questionService: QuestionService, questionSetService: QuestionsetService, quizService: QuizService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    addMessage(client: Socket, message: string): Promise<void>;
    quizEvent(client: Socket, data: any): Promise<void>;
    quizAnswer(client: Socket, data: any): Promise<void>;
    questionResult(client: Socket, data: any): Promise<void>;
    finalResult(client: Socket, set: any): Promise<void>;
    quizEnded(client: Socket, set: any): Promise<void>;
    quizTimeOut(client: Socket, questionId: number): Promise<void>;
}
