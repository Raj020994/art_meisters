"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [batch, setBatch] = useState("2026");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          batch,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.Success) {
        setError(data.Error || "Registration failed. Please try again.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/sign-in?registered=true");
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative py-20 px-4 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="size-16 bg-emerald-950/40 border border-emerald-800/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <svg className="size-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif text-emerald-400 font-semibold">Registration Successful!</h2>
            <p className="text-white/60 text-sm">
              Welcome to the Art Meister community. Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
                Join the Society
              </h1>
              <p className="animate-item text-white/60 text-base">
                Start your creative journey today.
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

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="animate-item space-y-1.5">
                <label className="text-xs font-medium text-white/80 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

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

              {/* Batch */}
              <div className="animate-item space-y-1.5">
                <label className="text-xs font-medium text-white/80 ml-1">Batch</label>
                <div className="relative group animate-item">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
                  <select
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-10 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white appearance-none cursor-pointer"
                    disabled={isLoading}
                    required
                  >
                    <option value="2024" className="bg-neutral-900 text-white">2024</option>
                    <option value="2025" className="bg-neutral-900 text-white">2025</option>
                    <option value="2026" className="bg-neutral-900 text-white">2026</option>
                    <option value="2027" className="bg-neutral-900 text-white">2027</option>
                    <option value="2028" className="bg-neutral-900 text-white">2028</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="animate-item space-y-1.5">
                <label className="text-xs font-medium text-white/80 ml-1">Password</label>
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

              {/* Confirm Password */}
              <div className="animate-item space-y-1.5">
                <label className="text-xs font-medium text-white/80 ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
                    Create Account <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </form>

            <div className="animate-item mt-6 text-center">
              <p className="text-white/40 text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-red-800 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;