import { UserModel } from "@/Models/User";
import { messageType } from "@/Types";
import { dbConnect } from "@/lib/dbConnect";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const result = messageSchema.safeParse(body);

  if (!result.success) {
    const errorResponse = result?.error?.issues?.map((error) => ({
      fieldName: error.path[0],
      message: error.message,
    }));

    return Response.json({
      success: false,
      ValidationErrors: errorResponse,
    });
  }

  const { content, username } = result.data;
  try {
    const user = await UserModel.findOne({
      username: username,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting Messages",
        },
        { status: 401 }
      );
    }

    const newMessage: Partial<messageType> = { content, createdAt: new Date() };
    user.messages.push(newMessage as messageType);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
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
