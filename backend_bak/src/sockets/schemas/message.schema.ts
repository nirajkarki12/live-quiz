import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
   message: {
      type: String,
      required: true
   },
   userName: {
      type: String,
      required: true
   },
   userImage: {
      type: String,
      required: true
   },
   isAdminUser: {
      type: Boolean,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});