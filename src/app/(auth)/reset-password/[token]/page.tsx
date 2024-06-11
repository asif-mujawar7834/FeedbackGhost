import ResetPasswordForm from "@/components/ResetPasswordForm";
export const generateMetadata = async () => {
  return {
    title: "Reset Password - FeedbackGhost: Anonymous Feedback Platform",
    description:
      "Reset your password securely with FeedbackGhost. Ensure the security of your account and continue sharing feedback anonymously in your community or workplace.",
  };
};
export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  return <ResetPasswordForm token={params.token} />;
}
