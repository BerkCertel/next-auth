"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signUp } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await signUp(formData);

      if (res.success) {
        toast.success("Kayıt başarılı!");
        router.push("/sign-in");
      } else {
        setError(res.message || "Bir hata oluştu.");
        toast.error("Kayıt başarısız", {
          description: res.message || "Lütfen bilgilerinizi kontrol edin.",
        });
      }
    });
  };

  return (
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
        autoComplete="new-password"
      />
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Kayıt olunuyor..." : "Sign Up"}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
