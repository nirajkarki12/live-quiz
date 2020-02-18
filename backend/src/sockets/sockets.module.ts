import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
// Services
import { SocketService } from './services/socket/socket.service';
// Schema
import { RoomSchema } from './schemas/room.schema';
import { MessageSchema } from './schemas/message.schema';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuizModule } from 'src/quiz/quiz.module';

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
