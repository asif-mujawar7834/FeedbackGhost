"use client";
import { Form } from "@/components/ui/form";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import FormInput from "./FormInput";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const customForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = customForm;

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmiting(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (!res?.ok) {
        throw new Error(res?.error as string);
      }

      toast({
        title: "Logged in successfully",
        variant: "success",
      });

      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Form {...customForm}>
      <form onSubmit={customForm.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          name="email"
          label="Email"
          control={customForm.control}
          error={errors.email?.message}
          placeholder="Enter your email"
          type="text"
          required={true}
        />

        <FormInput
          name="password"
          label="Password"
          control={customForm.control}
          error={errors.password?.message}
          placeholder="Enter your password"
          type="password"
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
              <p>Please Wait</p>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
