"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import { Messages } from "@/components/Messages";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const UserDashboard = () => {
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);

  useEffect(() => {
    const checkIsAcceptingMessages = async () => {
      try {
        const res = await fetch("/api/accept-messages");
        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(
            data.message || "Something went wrong while checking status"
          );
        }
        setIsAcceptingMessages(data.isAcceptingMessages);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: error.message,
          });
        }
      }
    };
    checkIsAcceptingMessages();
  }, []);

  const toggleAcceptMessageStatus = async () => {
    try {
      const res = await fetch("/api/accept-messages", {
        method: "POST",
        body: JSON.stringify({
          acceptMessage: !isAcceptingMessages,
        }),
      });

      const data = await res.json();

      if (res.status != 200) {
        throw new Error(data.message);
      }
      toast({
        variant: "success",
        title: data.message,
      });
      setIsAcceptingMessages(!isAcceptingMessages);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Failed",
          variant: "destructive",
          description: error.message,
        });
      }
    }
  };

  const { data: session } = useSession();
  if (!session || !session.user) {
    return <div></div>;
  }
  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  return (
    <div className="container bg-white mx-auto max-w-[1100px] p-4 sm:p-6 lg:p-8">
      <h1 className="font-extrabold text-2xl sm:text-3xl">Dashboard</h1>
      <Separator className="my-5" />
      <CopyToClipboard value={profileUrl} />
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={isAcceptingMessages}
          onCheckedChange={toggleAcceptMessageStatus}
        />
        <Label htmlFor="airplane-mode">
          <span className="font-semibold">Accepting Messages :</span>{" "}
          {isAcceptingMessages ? "Yes" : "No"}
        </Label>
      </div>
      <Separator className="my-5" />
      <Messages />
    </div>
  );
};
