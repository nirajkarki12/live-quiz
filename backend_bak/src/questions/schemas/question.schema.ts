import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },

   option1: {
       type: String,
       required: true,
   },

   option2: {
        type: String,
        required: true,
    },

    option3: {
        type: String,
        required: true,
    },

    option4: {
        type: String,
        required: true,
    },

    answer: {
        type: String,
        required: true,
    },

    level: {
        type: Number,
        required: true
    },
    
    questionSetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'QuestionSetSchema'
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

/**
  * On every save, add the date
  */
 QuestionSchema.pre('save', function(next) {
    const currentDate = new Date();
  
    this.updatedAt = currentDate;
    next();
  });
