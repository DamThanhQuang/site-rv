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
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useState } from "react";
import Cookies from "js-cookie";

export function RegisterBusiness({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const registerBusiness = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    if (!userId) {
      console.error("Không tìm thấy ID người dùng. Vui lòng đăng nhập!");
      return;
    }

    try {
      const response = await axios.patch(
        `user/${userId}/register-business`,
        {
          name,
          description,
          owner,
          phoneNumber,
          address,
          city,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Đăng ký business thành công:", response.data);
      router.push("/business");
    } catch (error) {
      console.error("Đăng ký business thất bại:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to register your business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerBusiness}>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Business Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Business Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                type="email"
                placeholder="m@example.com"
                required
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
