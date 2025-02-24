"use client";
import { cn } from "lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = () => {
    router.push("/register");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token); // Lưu token vao local storage
      router.push("/");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2 mt-4">
              <div className="flex items-center ">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
            <div className="mt-4 flex items-center justify-center">
              <p>OR</p>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Login with Google
              <FcGoogle />
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account? {""}
              <a
                href="/register"
                className="underline underline-offset-4"
                onClick={handleRegisterClick}
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
