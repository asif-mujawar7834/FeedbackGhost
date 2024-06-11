import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import profilePic from "../../public/profile1.png";
import Image from "next/image";
import { ArrowBigDownDash } from "lucide-react";
import { useRouter } from "next/navigation";
export const ProfileDropDown = ({
  firstName,
  profileImageUrl,
}: {
  firstName: string;
  profileImageUrl?: string;
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-3 items-center">
          <div className="bg-white h-[60px] w-[60px] rounded-full overflow-hidden">
            <Image
              src={profileImageUrl ? profilePic : profilePic}
              alt="Picture of the author"
            />
          </div>
          <Button variant="outline">
            <p className="font-bold">{firstName}</p>
            <ArrowBigDownDash className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.replace("/forgot-password")}
          className="d-flex justify-between"
        >
          Reset Password
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="d-flex justify-between"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
