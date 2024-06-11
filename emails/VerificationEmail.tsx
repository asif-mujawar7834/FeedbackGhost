import { VerificationEmailProps } from "@/Types";
import { Tailwind } from "@react-email/components";

export const VerificationEmail = ({
  username,
  otp,
}: VerificationEmailProps) => {
  return (
    <Tailwind>
      <section className="mx-auto bg-[#EEEEEE] shadow-md rounded-lg max-w-lg mt-4">
        <div className="text-center mb-6">
          <p className="text-2xl font-bold p-6 text-white bg-black rounded-md">
            Verify Your FeedbackGhost Account
          </p>
        </div>
        <div className="p-6 text-lg text-black">
          <p className="leading-6 mb-4">
            Hi <span className="font-bold text-orange-500">{username}</span>,
          </p>
          <p className="mb-4">
            Thank you for joining our community. To get started and complete
            your registration, please verify your email address using the
            6-digit verification code below:
          </p>
          <div className="text-center mb-4">
            <p className="select-all p-3 rounded-md bg-slate-300 text-3xl font-extrabold text-black tracking-widest space-x-3 selection:bg-orange-500 selection:text-white hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white">
              {otp}
            </p>
          </div>
          <p className="mb-4">
            Enter this code in the app to complete your registration.
          </p>
          <p className="mb-4">
            If you did not sign up for FeedbackGhost, please ignore this email
            or let us know.
          </p>
          <p className="mb-4">
            Thank you for joining us! We’re thrilled to have you as part of our
            community.
          </p>
          <p className="my-4">
            Best regards,
            <br />
            <span className="font-bold text-orange-500">
              The FeedbackGhost Team
            </span>
          </p>
          <hr className="border-t border-gray-300 my-6" />
          <p className="text-xs text-gray-600 text-center">
            1234 Feedback Lane, Suite 100 Cityville, CA 12345
          </p>
        </div>
      </section>
    </Tailwind>
  );
};
