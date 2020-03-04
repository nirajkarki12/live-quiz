"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.UserSchema = new mongoose.Schema({
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
exports.UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password') || user.password === null)
        return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
exports.UserSchema.methods.checkPassword = function (attempt, callback) {
    let user = this;
    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};
//# sourceMappingURL=user.schema.js.map