import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// Interfaces
import { Room } from '../../../sockets/interfaces/room.interface';
import { Message } from '../../../sockets/interfaces/message.interface';
import { UserInterface } from '../../../users/interfaces/user.interface';

@Injectable()
export class SocketService {
   constructor(
      @InjectModel('Room') private roomModel: Model<Room>,
      @InjectModel('Message') private messageModel: Model<Message>,
   ) {}

   async addMessage(message: string, user: UserInterface, roomId: string) {
      const room = await this.roomModel.findOne({ _id: roomId });

      let createdMessage = new this.messageModel({
         message: message,
         userName: user.name,
         userImage: user.image,
         isAdminUser: user.isAdmin || false,
      });
      await createdMessage.save();

      room.messages.push(createdMessage);
      room.save();
      return await createdMessage;
   }

   async addUsersToRoom(user: UserInterface, roomId: string) {
      return await this.roomModel.findOneAndUpdate({_id: roomId}, {
         $push: {
            users: user
         }
      }, {new: true});
   }

   async removeUsersFromRoom(user: UserInterface, roomId: string) {
      return await this.roomModel.findOneAndUpdate({_id: roomId}, {
         $pull: {
            users: {
               email: user.email
            }
         }
      }, {safe: true});

   }

   async updateRoom(roomId: string, data) {
      return await this.roomModel.findOneAndUpdate({_id: roomId}, data, {safe: true});
   }

   async createRoom(room: string): Model<Room> {
      let createdRoom = new this.roomModel({
         name: room,
      });
      return await createdRoom.save();
   }

   async findMessages(id: string, limit: number) {
      let room = await this.roomModel.findOne(
         {_id: id},
         {
            messages: {
               $slice: -limit
            },
         },
      );
      return room.messages;
    }

   async findRoomByName(roomName: string): Model<Room> {
      return await this.roomModel.findOne({ name: roomName, isClosed: false });
   }

   async update(user: UserInterface) {
      let createdPublicRoom = new this.roomModel({ 'user': user });
      return await createdPublicRoom.save();
   }

   async remove(user: UserInterface) {
      return await this.roomModel.findOneAndDelete({ user: user });
   }

}
