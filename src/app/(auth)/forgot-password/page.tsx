import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

export const generateMetadata = async () => {
  return {
    title: "Forgot Password - FeedbackGhost: Anonymous Feedback Platform",
    description:
      "Forgot your password? Reset it securely with FeedbackGhost. Regain access to your account and continue sharing feedback anonymously in your community or workplace.",
  };
};
export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
