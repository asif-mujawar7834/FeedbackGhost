import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/Models/User";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const messageId = searchParams.get("messageId");

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message:
          "Unauthorized access. Please ensure you are logged in and have the necessary permissions to perform this action.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(user._id);
    const updatedMessages = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $pull: { messages: { _id: messageId } },
      }
    );

    if (updatedMessages.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message is already deleted or not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
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
