"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpValues, signUpSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/lib/store/auth";
import { createUser } from "@/app/auth/signup/action";
import { useSocketStore } from "@/lib/store/socket";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      password: "",
      email: "",
      mobile: "",
    },
  });
  const connectSocket = useSocketStore((state) => state.connect);

  const onSubmit = async (data: SignUpValues) => {
    setIsLoading(true);
    try {
      const user =  await createUser(data)
         login(user);
         if(user.token) {
          connectSocket(user.token)
         }
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      router.push("/chat");
    } catch (error : any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

         <div className="space-y-2">
        <Input
          {...form.register("fullname")}
          type="text"
          placeholder="Name"
          className="w-full"
        />
        {form.formState.errors.fullname && (
          <p className="text-sm text-red-500">
            {form.formState.errors.fullname.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          {...form.register("email")}
          type="email"
          placeholder="Email"
          className="w-full"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...form.register("mobile")}
          type="tel"
          placeholder="Phone Number"
          className="w-full"
        />
        {form.formState.errors.mobile && (
          <p className="text-sm text-red-500">
            {form.formState.errors.mobile.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          {...form.register("password")}
          placeholder="Password"
          className="w-full"
          type="password"

        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <div className="text-gray-500 underline hover:pointer" onClick={() => router.push('/auth/login')}> Registered? click here to login </div>

      <Button
        type="submit"
        className="w-full bg-[#6E80A4] hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}