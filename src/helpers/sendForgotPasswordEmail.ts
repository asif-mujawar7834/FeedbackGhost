import { APIResponse } from "@/Types";
import { ForgotPasswordEmail } from "../../emails/ForgotPasswordEmail";
import { resend } from "@/lib/Resend";

export const sendForgotPasswordEmail = async ({
  firstName,
  url,
}: {
  firstName: string;
  url: string;
}): Promise<APIResponse> => {
  try {
    const d = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "asif381224@gmail.com",
      subject: "Forgot Password",
      react: ForgotPasswordEmail({ firstName, url }),
    });

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
};
