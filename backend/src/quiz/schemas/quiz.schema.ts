import * as mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({

   user:{
      type: String,
      required: true,
   },

   question:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'QuestionSchema'
   },

   answer: {
      type: String,
      required: false,
      default: null
   },

   isCorrect: {
      type: Boolean,
      default: false
   },

   isTimeOut: {
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
