import { UserModel } from "@/Models/User";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const { username, code } = await request.json();

  const user = await UserModel.findOne({
    username: username,
  });

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 401 }
    );
  }

  if (user.isVerified) {
    return Response.json(
      {
        success: false,
        message: "Your account is already verified",
      },
      { status: 400 }
    );
  }

  const isCodeValid = user.verifyCode === code;
  const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

  if (isCodeValid && isCodeNotExpired) {
    user.isVerified = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User Verified Successfully.",
      },
      { status: 200 }
    );
  } else if (!isCodeNotExpired) {
    return Response.json(
      {
        success: false,
        message:
          "Verification code is expired, Please signup again to get a new code",
      },
      { status: 403 }
    );
  } else {
    return Response.json(
      {
        success: false,
        message: "Incorrect verification code",
      },
      { status: 500 }
    );
  }
}
