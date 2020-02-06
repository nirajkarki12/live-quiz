import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
   },
   image: {
      type: String,
      default: null,
   },
   password: {
      type: String,
      default: null,
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   userId: {
      type: Number,
      default: null,
   },
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function(next) {

   let user = this;

   // Make sure not to rehash the password if it is already hashed
   if (!user.isModified('password') || user.password === null) return next();

   // Generate a salt and use it to hash the user's password
   bcrypt.genSalt(10, (err, salt) => {

      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {

         if (err) return next(err);
         user.password = hash;
         next();

      });

   });

});

UserSchema.methods.checkPassword = function(attempt, callback){

   let user = this;

   bcrypt.compare(attempt, user.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
   });

};
