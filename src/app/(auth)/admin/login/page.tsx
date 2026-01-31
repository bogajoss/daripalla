"use client";

import { UnifiedLoginForm } from "@/components/(auth)/UnifiedLoginForm";
import { loginAction } from "@/server/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (credentials: Record<string, string>) => {
    setLoading(true);
    setError("");
    try {
      await loginAction(credentials, "admin");
      router.push("/admin/batches"); // Or your admin dashboard
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <UnifiedLoginForm userType="admin" onSubmit={handleLogin} loading={loading} error={error} />;
}
