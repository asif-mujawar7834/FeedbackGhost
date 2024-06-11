"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setIsSubmiting(true);
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.message);
      }
      toast({
        title: "Reset passord link is sent to your email",
        variant: "success",
      });
      router.replace("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
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
          Forgot Password ?
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              label="If you have forgotten your password, dont worry! Just enter your email
        address below, and well send you instructions on how to reset your
        password"
              name="email"
              control={form.control}
              error={errors.email?.message}
              placeholder="Enter your email"
              type="text"
              required={true}
            />
            <Button
              type="submit"
              className="w-full p-6 mt-3"
              disabled={Object.keys(errors).length > 0 || isSubmiting}
            >
              {isSubmiting ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <p>Please Wait</p>
                </>
              ) : (
                "Send Reset Password Link"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
