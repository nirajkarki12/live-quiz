import * as mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
