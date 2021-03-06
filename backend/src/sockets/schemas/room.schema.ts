import * as mongoose from 'mongoose';
import { MessageSchema } from './message.schema';

export const RoomSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true 
    },
    isClosed: {
      type: Boolean,
      default: false
    },
    messages: [MessageSchema],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
 });
 
 /**
  * On every save, add the date
  */
 RoomSchema.pre('save', function(next) {
   const currentDate = new Date();
 
   this.updatedAt = currentDate;
   next();
 });
 