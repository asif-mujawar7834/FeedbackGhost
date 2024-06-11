"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SendFeedback({
  params,
}: {
  params: { username: string };
}) {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    values: {
      content: "",
      username: params.username,
    },
  });

  const {
    formState: { errors },
    setValue,
  } = form;

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    try {
      setIsSubmiting(true);
      const res = await fetch("/api/send-message", {
        body: JSON.stringify({
          content: values.content,
          username: params.username,
        }),
        method: "POST",
      });
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data?.message || "Unexpected error happened.");
      }

      toast({
        variant: "success",
        title: data.message,
      });
      setValue("content", "");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="container bg-white mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center">
        Public Profile Link
      </h1>
      <div className="my-14 max-w-[1100px] mx-auto bg-[#EEEEEE] p-5 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormInput
                label={`Recipient Username`}
                name="username"
                type="text"
                placeholder="Username"
                control={form.control}
                error={errors.username?.message}
                disabled={true}
                required={true}
              />
              <FormInput
                label={`Send anonymous feedback to @${params.username}`}
                name="content"
                type="text"
                placeholder="Write your anonymous message here."
                control={form.control}
                error={errors.content?.message}
                required={true}
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="mt-5" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Send It"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
