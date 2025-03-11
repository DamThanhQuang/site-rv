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
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    router.push("/login");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          email,
          firstName,
          lastName,
          userName,
          password,
        }
      );
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.log("Register failed:", error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to register for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="username">First name</Label>
              <Input
                id="username"
                type="text"
                placeholder="First name"
                required
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="username">Last name</Label>
              <Input
                id="username"
                type="text"
                placeholder="Last name"
                required
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Register
            </Button>
            <div className="mt-4 flex items-center justify-center">
              {" "}
              <p>OR</p>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Login with Google
              <FcGoogle />
            </Button>
            <div className="mt-4 text-center text-sm">
              Do you have an account? {""}
              <a
                href="/login"
                className="underline underline-offset-4"
                onClick={handleLoginClick}
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
