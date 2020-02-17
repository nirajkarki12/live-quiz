import * as Document from 'mongoose';
import { User } from "../../users/interfaces/user.interface";
import { Message } from './message.interface';

export interface Room extends Document {
   id: string;
   name: string;
   isPrivate: Boolean;
   // users?: User[];
   messages?: Message[];
   createdAt: Date;
   updatedAt: Date;
}

