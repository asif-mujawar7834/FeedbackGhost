import { userType, messageType } from "@/Types";
import mongoose, { Schema } from "mongoose";

const messageSchema: Schema<messageType> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema: Schema<userType> = new Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    default: "",
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is expired"],
  },
  verifyCode: {
    type: String,
    required: [true, "verified code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [messageSchema],
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordTokenExpiry: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel =
  (mongoose.models.users as mongoose.Model<userType>) ||
  mongoose.model<userType>("users", userSchema);
