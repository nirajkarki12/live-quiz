import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Services
import { SocketService } from './services/socket/socket.service';
// Schema
import { RoomSchema } from './schemas/room.schema';
import { MessageSchema } from './schemas/message.schema';
// Modules
import { UsersModule } from '../users/users.module';
import { QuestionsModule } from '../questions/questions.module';
import { QuizModule } from '../quiz/quiz.module';
// Gateways
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Room', schema: RoomSchema},
      {name: 'Message', schema: MessageSchema},
    ]),
    QuestionsModule,
    UsersModule,
    QuizModule  
  ],
  providers: [
    ChatGateway,
    SocketService,
  ],
})
export class SocketsModule {}
