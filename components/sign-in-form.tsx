"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        await signIn("credentials", { email, password });

        toast.success("Login successful!");
        router.push("/");
      } catch (err: any) {
        const message = err?.message || "An error occurred during login.";
        setError(message);
        toast.error("Login failed", {
          description: message,
        });
      }
    });
  };

  return (
    <Card>
      <CardContent className="space-y-4 py-6 px-4">
        <form className="space-y-4" action={handleSubmit}>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="current-password"
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Giriş yapılıyor..." : "Sign In"}
          </Button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
