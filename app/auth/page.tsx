"use client";

import { SignInMethodDivider } from "@/components/SignInMethodDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"signIn" | "signUp" | { email: string }>("signIn");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    if (step === "signUp" && password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setPasswordError("");

    try {
      await signIn("password", formData);

      if (step === "signIn" || step === "signUp") {
        setStep({ email: formData.get("email") as string });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {step === "signIn" ? "Sign in" : step === "signUp" ? "Create an account" : "Verify email"}
          </CardTitle>
          <CardDescription>
            {step === "signIn"
              ? "Enter your email below to sign in"
              : step === "signUp"
                ? "Enter your details below to create your account"
                : "Enter the verification code sent to your email"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {(step === "signIn" || step === "signUp") ? (
              <>
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                />
                <div className="space-y-2">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    onChange={() => setPasswordError("")}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
                <input name="flow" value={step} type="hidden" />
              </>
            ) : (
              <>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter verification code"
                  required
                  disabled={isLoading}
                />
                <input name="email" value={step.email} type="hidden" />
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {step === "signIn"
                ? "Sign in"
                : step === "signUp"
                  ? "Sign up"
                  : "Verify"}
            </Button>

            {(step === "signIn" || step === "signUp") && (
              <>
                <SignInMethodDivider />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
                  disabled={isLoading}
                >
                  {step === "signIn" ? "Create account" : "Sign in instead"}
                </Button>
              </>
            )}

            {typeof step === "object" && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("signIn")}
                disabled={isLoading}
              >
                Back to sign in
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}

