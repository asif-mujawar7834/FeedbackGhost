import { dbConnect } from "@/lib/dbConnect";

import { userNameValidation } from "../../../schemas/signUpSchema";
import { z } from "zod";
import { UserModel } from "@/Models/User";

const userNameValidationSchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 }
    );
  }

  const { searchParams } = new URL(request.url);
  const queryParams = {
    username: searchParams.get("username"),
  };
  await dbConnect();
  try {
    const result = userNameValidationSchema.safeParse(queryParams);
    if (!result.success) {
      const userNameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message:
          userNameErrors.length > 0
            ? userNameErrors.join(", ")
            : "Invalid username",
      });
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username: username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
