import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// Interfaces
import { Room } from 'src/sockets/interfaces/room.interface';
import { User } from 'src/users/interfaces/user.interface';
import { Message } from 'src/sockets/interfaces/message.interface';

@Injectable()
export class SocketService {
   constructor(
      @InjectModel('Room') private roomModel: Model<Room>,
      @InjectModel('Message') private messageModel: Model<Message>,
   ) {}

   async addMessage(message: string, user: User, roomId: string) {
      const room = await this.roomModel.findById(roomId);

      let createdMessage = new this.messageModel({
         message: message,
         user: user.id
      });
      await createdMessage.save();

      room.messages.push(createdMessage);
      return await room.save();
   }

   async addUsersToRoom(user: User, roomId: string) {
      return await this.roomModel.findOneAndUpdate(roomId, {
         $push: {
            users: user
         }
      }, {new: true});
   }

   async removeUsersFromRoom(user: User, roomId: string) {
      console.log('removing user', user);
      return await this.roomModel.findOneAndUpdate(roomId, {
         $pull: {
            users: {
               email: user.email
            }
         }
      }, {safe: true});

   }

   async createRoom(room: string): Model<Room> {
      let createdRoom = new this.roomModel({
         name: room,
      });
      return await createdRoom.save();
   }

   async findRoomByName(roomName: string): Model<Room> {
      return await this.roomModel.findOne({ name: roomName});
   }

   async update(user: User) {
      let createdPublicRoom = new this.roomModel({ 'user': user });
      return await createdPublicRoom.save();
   }

   async remove(user: User) {
      return await this.roomModel.findOneAndDelete({ user: user });
   }

}
