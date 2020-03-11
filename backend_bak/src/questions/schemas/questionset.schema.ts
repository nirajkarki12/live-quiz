import * as mongoose from 'mongoose';
import { QuestionSchema } from './question.schema';

export const QuestionSetSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },

   scheduleDate: {
       type: Date,
       format:'date',
       required: true,
   },

   isCompleted: {
      type: Boolean,
      default: false
    },

    questions:[QuestionSchema],

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
 QuestionSetSchema.pre('save', function(next) {
    const currentDate = new Date();
  
    this.updatedAt = currentDate;
    next();
  });