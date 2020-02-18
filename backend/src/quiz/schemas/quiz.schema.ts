import * as mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserSchema'
    },
    
    question:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'QuestionSchema'
     },
 

   answer: {
       type: String,
       required: true,
   },

   isCorrect: {
       type: Boolean,
       default: false
   },


    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});
