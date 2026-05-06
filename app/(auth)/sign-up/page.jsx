"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Palette, 
  Heart,
  Eye,
  EyeOff,
} from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <div  className="relative py-20 px-4 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
            Join the Society
          </h1>
          <p className="animate-item text-white/60 text-base">
            Start your creative journey today.
          </p>
        </div>

        <form className="space-y-4">
          {/* Full Name */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">I am an...</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative cursor-pointer group">
                <input type="radio" name="role" className="peer sr-only" defaultChecked />
                <div className="flex-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl peer-checked:border-red-800/50 peer-checked:bg-red-800/10 transition-all hover:bg-white/10">
                  <Palette className="size-4 text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-xs font-medium">Artist</span>
                </div>
              </label>
              <label className="relative cursor-pointer group">
                <input type="radio" name="role" className="peer sr-only" />
                <div className="flex-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl peer-checked:border-red-800/50 peer-checked:bg-red-800/10 transition-all hover:bg-white/10">
                  <Heart className="size-4 text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-xs font-medium">Enthusiast</span>
                </div>
              </label>
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="animate-item w-full bg-red-800 hover:bg-red-950 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex-center gap-2 group mt-2 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Create Account <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </span>
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
      </div>

    </div>
  );
};

export default SignUpPage;