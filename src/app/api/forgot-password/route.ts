import { UserModel } from "@/Models/User";
import { sendForgotPasswordEmail } from "@/helpers/sendForgotPasswordEmail";
import { dbConnect } from "@/lib/dbConnect";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  const result = forgotPasswordSchema.safeParse(body);

  if (!result.success) {
    const validationErrors = result.error.issues.map((error) => ({
      field: error.path[0],
      message: error.message,
    }));
    return Response.json({
      success: false,
      validationErrors,
    });
  }

  try {
    const user = await UserModel.findOne({
      email: result.data.email,
      isVerified: true,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.RESET_PASSWORD_SECRETE_KEY as string,
      { expiresIn: "20m" }
    );

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 20 * 60 * 1000);
    await user.save();

    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host =
      request.headers.get("x-forwarded-host") || request.headers.get("host");

    const baseUrl = `${protocol}://${host}`;

    const emailResponse = await sendForgotPasswordEmail({
      firstName: user.firstName,
      url: `${baseUrl}/reset-password/${token}`,
    });

    if (!emailResponse.success) {
      throw new Error(emailResponse.message);
    }

    return Response.json(
      {
        success: true,
        message:
          "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}
