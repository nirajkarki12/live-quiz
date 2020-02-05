import * as Document from 'mongoose';
import { User } from "src/users/interfaces/user.interface";

export interface Message extends Document {
   message: string;
   user: User;
   createdAt: Date;
}
