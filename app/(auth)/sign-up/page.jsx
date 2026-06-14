"use client";
import { useEffect, useState } from "react";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/user";
import Link from "next/link";
import { signUpUser } from "@/service/auth";
import useFetch from "@/hooks/useFetch";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    reset,
    formState: { errors },

    handleSubmit,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    fn: signingUpUser,
    loading: isSigning,
    data: data,
  } = useFetch(signUpUser);
  const onsubmit = async (data) => {
     signingUpUser(data);
  };
  useEffect(() => {
    if (data?.Success && !isSigning) {
      toast.success("Account Created Successfully");
      reset();
      router.push(`/u/${data.Data.ID}`);
    } else {
      return;
    }
  }, [data, isSigning]);

  return (
    <div className="relative py-20 px-4 overflow-hidden">
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

        <form onSubmit={handleSubmit(onsubmit)}>
          {/* Full Name */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
              {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
              {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
              {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-white/80 ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-sm text-white placeholder:text-white/20"
                required
              />
              {errors?.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigning}
            className="animate-item w-full bg-red-800 hover:bg-red-950 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex-center gap-2 group mt-2 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Create Account{" "}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>

          {/* Divider */}
          <div className="animate-item flex items-center gap-4 my-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-white/30 font-medium uppercase tracking-wider">
              or continue with
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="animate-item w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all flex-center gap-3 group"
          >
            <svg
              className="size-4 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
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
            <span className="text-xs font-semibold">Google</span>
          </button>
        </form>

        <div className="animate-item mt-6 text-center">
          <p className="text-white/40 text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-red-800 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
