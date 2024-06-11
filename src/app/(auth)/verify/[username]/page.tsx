import OTPForm from "@/components/OTPForm";
export const generateMetadata = async () => {
  return {
    title: "Verify Your Account - FeedbackGhost: Anonymous Feedback Platform",
    description:
      "Complete your sign-up process by verifying your account with a 6-digit code. Enter the code you received to authenticate your account and gain full access to FeedbackGhost. Join our community to share and receive anonymous feedback, fostering open and honest communication without fear of judgment.",
  };
};
export default function Page({ params }: { params: { username: string } }) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[400px] max-w-[500px] bg-[#EEEEEE] shadow-md px-6 py-8  rounded-md">
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Verify Your Account.
          </h1>
          <p className="font-semibold text-center text-md mt-3">
            6 Digit code is sent to your email
          </p>
        </div>
        <OTPForm username={params.username} />
      </div>
    </div>
  );
}
