import SignInForm from "@/components/SignInForm";
import Link from "next/link";

export const generateMetadata = async () => {
  return {
    title: "Sign In - FeedbackGhost: Anonymous Feedback Platform",
    description:
      "Sign in to FeedbackGhost to access your account and start sharing anonymous feedback. Join the conversation, communicate openly, and drive positive change in your community or workplace.",
  };
};

export default function SignIn() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-200">
      <div className="w-[400px] max-w-[500px] shadow-md border border-slate-300 px-6 py-8 bg-white rounded-md">
        <div className="mb-5">
          <h1 className="font-bold text-4xl text-center">
            Anonymous Review App.
          </h1>
          <p className="font-semibold text-center text-md mt-3">
            Login to start your anonymous adventure.
          </p>
        </div>
        <SignInForm />
        <p className="text-center text-sm mt-2 font-semibold">
          Dont have an account ?{" "}
          <span className="text-blue-500">
            <Link href={"/sign-up"}>SignUp</Link>
          </span>
        </p>
        <p className="text-center text-sm mt-2 font-semibold">
          <span className="text-blue-500">
            <Link href={"/forgot-password"}>Forgot Password</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
