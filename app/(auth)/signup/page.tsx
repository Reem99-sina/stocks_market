"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation/auth";
import z from "zod";
import { useSignUp } from "@/action/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleApiRequest } from "@/lib/apiHandle";

type FormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const { mutateAsync } = useSignUp();
  const onSubmit = async (data: FormData) => {
    try {
      const result = await handleApiRequest(() => mutateAsync(data));
      if (!result) return;

      toast.success("Logged in successfully 🎉");
      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-100 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>Name</Label>

            <Input
              {...register("name")}
              placeholder="Enter your name"
              error={errors.name?.message}
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              error={errors.email?.message}
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              error={errors.password?.message}
            />
          </div>

          <Button className="w-full">Create account</Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Already have account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
