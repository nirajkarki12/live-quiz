import * as Document from 'mongoose';

export interface Message extends Document {
   message: string;
   userName: string;
   userImage: string;
   isAdminUser: Boolean;
   createdAt: Date;
}
