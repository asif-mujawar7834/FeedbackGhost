"use client";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import FormInput from "./FormInput";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function OTPForm({ username }: { username: string }) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifySchema>) => {
    try {
      setIsSubmiting(true);
      const res = await fetch("/api/verify-code", {
        method: "POST",
        body: JSON.stringify({
          username,
          code: values.code,
        }),
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(
          data.message || "Something went wrong while verifying user."
        );
      }
      toast({
        variant: "success",
        title: "Verification Success",
        description: data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          type="text"
          placeholder="Enter your 6 digit otp here"
          control={form.control}
          name="code"
          error={errors.code?.message}
          required={true}
        />

        <Button
          type="submit"
          className="w-full p-6"
          disabled={Object.keys(errors).length > 0 || isSubmiting}
        >
          {isSubmiting ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              <p>Verifying</p>
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
}
