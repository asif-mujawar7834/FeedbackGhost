"use client";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const router = useRouter();
  const [isCheckingUsername, setIsCheckingUserName] = useState(false);
  const [isSubmitingForm, setIsSubmittingForm] = useState(false);

  const customForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
    watch,
    trigger,
  } = customForm;

  const username = watch("username");
  const { debouncedValue } = useDebounce(username, 500);

  useEffect(() => {
    const checkIsUserNameAvailable = async () => {
      const isValid = await trigger("username");
      if (!isValid) {
        return;
      }

      try {
        setIsCheckingUserName(true);

        const res = await fetch(
          `/api/check-username-unique?username=${debouncedValue}`
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Error while checking username");
        }
      } catch (error) {
        if (error instanceof Error) {
          customForm.setError("username", {
            type: "manual",
            message: error.message || "Unexpected error occured",
          });
        }
      } finally {
        setIsCheckingUserName(false);
      }
    };
    if (username) {
      checkIsUserNameAvailable();
    }
  }, [debouncedValue]);

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setIsSubmittingForm(true);
      const res = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status != 200) {
        throw new Error(
          data.message || "Something Went Wrong while registration"
        );
      }
      toast({
        variant: "success",
        title: data.message,
      });
      setTimeout(() => {
        router.replace(`/verify/${username}`);
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: error.message,
        });
      }
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <Form {...customForm}>
      <form onSubmit={customForm.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          name="firstName"
          placeholder="Enter your firstname"
          label="First Name"
          control={customForm.control}
          error={errors.firstName?.message}
          type="text"
          required={true}
        />
        <FormInput
          name="lastName"
          placeholder="Enter your lastname"
          label="Last Name"
          control={customForm.control}
          error={errors.lastName?.message}
          type="text"
        />
        <div className="relative">
          <FormInput
            name="username"
            placeholder="Enter your username"
            label="Username"
            control={customForm.control}
            error={errors.username?.message}
            type="text"
            required={true}
          />
          {isCheckingUsername && (
            <p className="text-sm font-medium text-green-500 mt-2 flex items-center">
              <Loader2 className="mr-2" /> Please wait
            </p>
          )}
        </div>

        <FormInput
          name="email"
          placeholder="Enter your email"
          label="Email"
          control={customForm.control}
          error={errors.email?.message}
          type="text"
          required={true}
        />

        <FormInput
          name="password"
          placeholder="Enter your Password"
          label="Password"
          control={customForm.control}
          error={errors.password?.message}
          type="password"
          required={true}
        />

        <Button
          className="w-full p-6"
          disabled={Object.keys(errors).length > 0 || isSubmitingForm}
        >
          {isSubmitingForm ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              <p>Please Wait</p>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
