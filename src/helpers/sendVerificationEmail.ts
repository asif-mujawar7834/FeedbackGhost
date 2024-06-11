import { APIResponse } from "@/Types";
import { resend } from "@/lib/Resend";
import { VerificationEmail } from "../../emails/VerificationEmail";

interface verificationEmailProps {
  username: string;
  email: string;
  verifyCode: string;
}
export const sendVerificationEmail = async ({
  username,
  email,
  verifyCode,
}: verificationEmailProps): Promise<APIResponse> => {
  try {
    const d = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "asif381224@gmail.com",
      subject: "Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
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
