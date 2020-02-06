import * as mongoose from 'mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';

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