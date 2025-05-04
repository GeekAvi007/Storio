"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "./ui/moving-border";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      console.error("Sign-up error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Verification incomplete:", result);
        setVerificationError(
          "Verification could not be completed. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setVerificationError(
        error.errors?.[0]?.message ||
          "An error occurred during verification. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <div >
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
          Verify Your Email
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
          We've sent a verification code to your email
        </p>

        {verificationError && (
          <div className="mt-4 flex items-center gap-2 rounded-md bg-red-100 px-4 py-2 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span>{verificationError}</span>
          </div>
        )}

        <form
          className="my-8 space-y-4 border border-r-1.75 border-cyan-600 p-10 rounded-3xl"
          onSubmit={handleVerificationSubmit}
        >
          <LabelInputContainer>
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              placeholder="Enter the 6-digit code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              autoFocus
            />
          </LabelInputContainer>

          <div className="flex justify-center mt-4">
            <Button
              disabled={isSubmitting}
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 items-center justify-center"
              type="submit"
            >
              {isSubmitting ? "Verifying..." : "Verify Email →"}
              <BottomGradient />
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Didn't receive a code?{" "}
            <button
              onClick={async () => {
                if (signUp) {
                  await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                  });
                }
              }}
              className="text-cyan-600 hover:underline dark:text-cyan-400"
            >
              Resend code
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
        Create Your Account
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
        Sign up to start managing your images securely
      </p>

      {authError && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-red-100 px-4 py-2 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>{authError}</span>
        </div>
      )}

      <form
        className="my-8 space-y-4 border border-r-1.75 border-cyan-600 p-10 rounded-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              {...register("email")}
              className="pl-10" // leave space for icon
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="pl-10 pr-10" // leave space for icons
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <div className="relative">
            <Input
              id="passwordConfirmation"
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
              {...register("passwordConfirmation")}
              className="pl-10 pr-10" // leave space for icons
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.passwordConfirmation && (
            <p className="text-sm text-red-600">{errors.passwordConfirmation.message}</p>
          )}
        </LabelInputContainer>

        <div className="flex items-start gap-2 mt-2">
          <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            disabled={isSubmitting}
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 items-center justify-center"
            type="submit"
          >
            {isSubmitting ? "Creating account..." : "Create Account →"}
            <BottomGradient />
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-neutral-600 dark:text-neutral-300">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-cyan-600 hover:underline dark:text-cyan-400"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);