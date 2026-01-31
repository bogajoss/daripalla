"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NotebookText, Eye, EyeOff } from "lucide-react";
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
import { registerAction } from "@/server/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerAction(formData);
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="border border-border shadow-2xl">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
                <NotebookText className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              নিবন্ধন
            </CardTitle>
            <p className="text-sm font-medium text-muted-foreground mt-2">
              শিক্ষার্থী পোর্টাল
            </p>
            <CardDescription className="text-base mt-3 text-muted-foreground">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">
                  পূর্ণ নাম
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  ফোন নম্বর
                </Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="আপনার ফোন নম্বর"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" title="পাসওয়ার্ড" className="text-sm font-semibold">
                  পাসওয়ার্ড
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="পাসওয়ার্ড দিন"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "নিবন্ধন করা হচ্ছে..." : "নিবন্ধন করুন"}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  লগইন করুন
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
