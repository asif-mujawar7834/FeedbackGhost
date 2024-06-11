import { messageType } from "@/Types";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import MessageCard from "./MessageCard";
import { Button } from "./ui/button";
import { Loader2, RefreshCcw } from "lucide-react";

export const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<messageType[]>([]);
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/get-messages");
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(
          data?.message || "Something went wrong while fetching messages."
        );
      }

      setMessages(data?.messages);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (messageId: string) => {
    try {
      const updatedMessages = messages.map((message) =>
        message._id === messageId ? { ...message, isDeleting: true } : message
      );
      setMessages(updatedMessages as messageType[]);
      const res = await fetch(`/api/delete-message?messageId=${messageId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data?.message || "Unexpected Error");
      }
      const newMessageList = messages.filter(
        (message) => message._id != messageId
      );
      setMessages(newMessageList);
      toast({
        variant: "success",
        title: data.message,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected Error";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
      const updatedMessages = messages.map((message) =>
        message._id === messageId ? { ...message, isDeleting: false } : message
      );
      setMessages(updatedMessages as messageType[]);
    }
  };

  const messagesList = messages.map((message) => (
    <MessageCard
      key={message._id}
      message={message}
      onDeleteMessage={handleDelete}
    />
  ));

  const messagesNotAvailable = (
    <h1 className="font-semibold">
      Looks like there are no messages here at the moment.
    </h1>
  );

  const content =
    messagesList.length === 0 ? messagesNotAvailable : messagesList;

  return (
    <>
      <Button onClick={fetchMessages}>
        {loading ? <Loader2 className="animate-spin" /> : <RefreshCcw />}
      </Button>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {content}
      </div>
    </>
  );
};
