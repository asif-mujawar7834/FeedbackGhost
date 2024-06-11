import { messageType } from "@/Types";
import { Loader2, X } from "lucide-react";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface messageCardProp {
  message: messageType;
  onDeleteMessage: (messageId: string) => void;
}

export default function MessageCard({
  message,
  onDeleteMessage,
}: messageCardProp) {
  return (
    <div className="shadow-md p-5 bg-[#EEEEEE] rounded-md">
      <div className="flex justify-between">
        <h1 className="text-lg sm:text-xl font-bold">{message.content}</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={message.isDeleting}>
              {message.isDeleting ? (
                <Loader2 className="w-5 animate-spin" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteMessage(message._id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="text-sm mt-2 font-semibold text-slate-600">
        {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
      </p>
    </div>
  );
}
