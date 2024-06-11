import { UserModel } from "@/Models/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { dbConnect } from "@/lib/dbConnect";
import { signUpSchema } from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();

    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return Response.json({
        success: false,
        message: "Validation Error",
        errors: result.error.issues,
      });
    }

    const { firstName, lastName, profileImageUrl, username, email, password } =
      body;

    const existingUserWithVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserWithVerifiedUsername) {
      return Response.json({
        success: false,
        message: "username is already taken",
      });
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 403 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        firstName,
        lastName,
        profileImageUrl,
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessages: true,
        messages: [],
        resetPasswordToken: "",
        resetPasswordTokenExpiry: "",
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail({
      email,
      username: firstName,
      verifyCode,
    });

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully, Please verify your email.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected Error";
    return Response.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
