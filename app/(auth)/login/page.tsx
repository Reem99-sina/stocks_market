"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        toast.error("Invalid email or password"); // 🔴 clean
      } else {
        toast.success("Logged in successfully 🎉");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-100 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              error={errors?.email?.message}
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors?.password?.message}
            />
          </div>

          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-base text-center text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
