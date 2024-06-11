import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserModel } from "@/Models/User";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const { acceptMessage } = await request.json();

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        isAcceptingMessages: acceptMessage,
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 402 }
      );
    }

    return Response.json(
      {
        success: true,
        message: acceptMessage
          ? "You are now accepting messages."
          : "You are no longer accepting messages.",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error while updating user",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const userFound = await UserModel.findById(user._id);

    if (!userFound) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      isAcceptingMessages: userFound.isAcceptingMessages,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Error while getting user data",
    });
  }
}
