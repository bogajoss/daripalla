"use client";

import { UnifiedLoginForm } from "@/components/(auth)/UnifiedLoginForm";
import { loginAction } from "@/server/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (credentials: Record<string, string>) => {
    setLoading(true);
    setError("");
    try {
      await loginAction(credentials, "student");
      router.push("/dashboard"); // Or wherever students go
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <UnifiedLoginForm userType="student" onSubmit={handleLogin} loading={loading} error={error} />;
}
