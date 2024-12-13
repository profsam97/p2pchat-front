"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  loginSchema, loginValues } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/lib/store/auth";
import {  loginUser } from "@/app/auth/signup/action";
import { useSocketStore } from "@/lib/store/socket";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  
  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const connectSocket = useSocketStore((state) => state.connect);

  const onSubmit = async (data: loginValues) => {
    setIsLoading(true);
    try {
      const user =  await loginUser(data)
         login(user);
         if(user.token) {
          connectSocket(user.token)
         }
      toast({
        title: "Success",
        description: "Logged in  successfully!",
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
        <div className="text-gray-500 underline pointer" onClick={() => router.push('/')}> No account? click here to register </div>
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Log in"}
      </Button>
    </form>
  );
}