"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye,
  EyeOff,
} from "lucide-react";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      setError(`Failed to sign in with ${provider}.`);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative py-20 px-4 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
        <div className="text-center mb-6">
          <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
            Welcome Back
          </h1>
          <p className="animate-item text-white/60 text-base">
            Continue your creative journey.
          </p>
        </div>

        {error && (
          <div className="animate-item mb-4 p-3.5 bg-red-950/40 border border-red-850/50 rounded-xl flex items-start gap-2.5 text-red-200 text-xs">
            <svg className="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          {/* Email */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="animate-item space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-medium text-white/80">Password</label>
              <Link href="/forgot-password" size="sm" className="text-[10px] text-red-800 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="animate-item w-full bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 group mt-2 overflow-hidden relative cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Sign In <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>

          {/* Divider */}
          <div className="animate-item flex items-center gap-4 my-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-white/30 font-medium uppercase tracking-wider">or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* OAuth Logins */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Login */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
              className="animate-item bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2.5 group cursor-pointer disabled:cursor-not-allowed text-xs"
            >
              <svg className="size-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-semibold">Google</span>
            </button>

            {/* GitHub Login */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
              className="animate-item bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2.5 group cursor-pointer disabled:cursor-not-allowed text-xs"
            >
              <svg className="size-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="font-semibold">GitHub</span>
            </button>
          </div>
        </form>

        <div className="animate-item mt-6 text-center">
          <p className="text-white/40 text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-red-800 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
