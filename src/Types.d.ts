import { Document } from "mongoose";
import "next-auth";
import { DefaultSession } from "next-auth";

interface messageType extends Document {
  _id: string;
  content: string;
  createdAt: Date;
  isDeleting?: boolean;
}

interface userType extends Document {
  firstName: string;
  lastName?: string;
  profileImageUrl?: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessages: boolean;
  messages: messageType[];
  resetPasswordToken: string | null;
  resetPasswordTokenExpiry: Date | null;
}

interface VerificationEmailProps {
  username: string;
  otp: string;
}

interface APIResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: messageType[];
}

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isAcceptingMessages?: boolean;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }

  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      firstName?: string;
      lastName?: string;
      profileImageUrl?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }
}
