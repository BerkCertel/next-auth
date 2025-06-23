"use server";

import { GithubSignIn } from "@/components/github-sign-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInForm from "@/components/sign-in-form";

const Page = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>

      <GithubSignIn />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign in with email
          </span>
        </div>
      </div>

      <SignInForm />

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-up">Dont`have an account? Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
