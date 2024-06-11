"use client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ProfileDropDown } from "./ProfileDropDown";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleClick = async () => {
    router.replace("/sign-in");
  };

  return (
    <nav className=" bg-[#EEEEEE] sticky top-0 z-10 shadow-lg">
      <div className="max-w-[1100px] mx-auto p-7 flex justify-between items-center">
        <h1 className="font-extrabold text-2xl sm:text-3xl text-black">
          FeedbackGhost
        </h1>

        {user ? (
          <ProfileDropDown
            firstName={user?.firstName as string}
            profileImageUrl={user?.profileImageUrl}
          />
        ) : (
          <Button
            onClick={handleClick}
            className="font-bold bg-black text-white"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}
