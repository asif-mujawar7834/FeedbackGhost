import { Tailwind } from "@react-email/components";

export const ForgotPasswordEmail = ({
  firstName,
  url,
}: {
  firstName: string;
  url: string;
}) => {
  return (
    <Tailwind>
      <section className="mx-auto bg-[#EEEEEE] shadow-md rounded-lg max-w-lg mt-4">
        <div className="text-center mb-6">
          <p className="text-2xl font-bold p-6 text-white bg-black rounded-md">
            Reset Your FeedbackGhost Password
          </p>
        </div>
        <div className="p-6 text-lg text-black">
          <p className="leading-6 mb-4">
            Hi <span className="font-bold text-orange-500">{firstName}</span>,
          </p>
          <p className="mb-4">
            We received a request to reset your FeedbackGhost password. To
            proceed with resetting your password, please click the link below:
          </p>
          <a
            href={url}
            className="inline-block bg-orange-600 text-white text-center font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Reset Password
          </a>
          <p className="mt-6">
            For security reasons, this link will expire in 20 minutes. If you
            dont reset your password within this time frame, you will need to
            submit another password reset request.
          </p>
          <p className="mt-6">
            If you did not request a password reset, you can safely ignore this
            email. Your account security is important to us, and no action is
            needed.
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
