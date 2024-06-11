import { UserModel } from "@/Models/User";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
export async function POST(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);

  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);
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
    const token = searchParams.get("token");
    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Token is required",
        }),
        { status: 400 }
      );
    }

    const decodedToken = jwt.verify(
      token,
      process.env.RESET_PASSWORD_SECRETE_KEY as string
    ) as { userId: string };

    if (!decodedToken) {
      return Response.json(
        {
          success: false,
          message: "Invalid Token",
        },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({
      _id: decodedToken.userId,
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gte: new Date() },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message:
            "User not found Or you've already used this token to reset your password.",
        },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiry = null;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Password Reset Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          success: false,
          message:
            error.message === "jwt expired"
              ? "Your reset token has expired. Please request a new one to continue."
              : error.message,
        },
        { status: 500 }
      );
    }
  }
}
