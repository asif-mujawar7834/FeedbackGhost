"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setIsSubmiting(true);
      const res = await fetch(`/api/reset-password?token=${token}`, {
        body: JSON.stringify(values),
        method: "POST",
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data?.message || "Unexpected error occured");
      }
      toast({
        variant: "success",
        title: data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: error.message,
        });
      }
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[400px] max-w-[500px] bg-[#EEEEEE] shadow-md px-6 py-8  rounded-md">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3">
          Reset Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <FormInput
                name="password"
                label="New Password"
                control={form.control}
                error={errors.password?.message}
                placeholder="Enter your new password"
                type="password"
                required={true}
              />

              <FormInput
                name="confirmPassword"
                label="Confirm new password"
                control={form.control}
                error={errors.confirmPassword?.message}
                placeholder="Enter your confirmed password"
                type="password"
                required={true}
              />
            </div>

            <Button
              type="submit"
              className="w-full p-6 mt-5"
              disabled={Object.keys(errors).length > 0 || isSubmiting}
            >
              {isSubmiting ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <p>Please Wait</p>
                </>
              ) : (
                "Set Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
