import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
   message: {
      type: String,
      required: true
   },
   user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});