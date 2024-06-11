import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

export const generateMetadata = async () => {
  return {
    title: "Sign Up - FeedbackGhost: Anonymous Feedback Platform",
    description:
      "Sign up for FeedbackGhost to join the conversation anonymously. Start sharing your feedback, communicate openly, and drive positive change in your community or workplace.",
  };
};

export default function SignUp() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200">
      <div className="w-[400px] max-w-[500px] shadow-md border border-slate-300 px-6 py-8 rounded-md bg-white my-5">
        <div className="mb-5">
          <h1 className="font-bold text-4xl text-center">
            Anonymous Review App.
          </h1>
          <p className="font-semibold text-center text-md mt-3">
            Sign Up to start your anonymous adventure.
          </p>
        </div>
        <SignUpForm />
        <p className="text-center text-sm mt-2 font-semibold">
          Already a member ?{" "}
          <span className="text-blue-500">
            <Link href={"/sign-in"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
