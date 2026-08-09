import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#090B0D]">

      {/* Branding */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(34,197,94,0.13),transparent_35%)]" />

        <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

          <Link
            to="/"
            className="flex w-fit items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]">
              <span className="font-black text-[#07100A]">
                M
              </span>
            </div>

            <span className="text-xl font-bold">
              MANIT<span className="text-[#22C55E]">Tube</span>
            </span>
          </Link>

          <div className="max-w-lg">

            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#22C55E]">
              Join the community
            </p>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight xl:text-6xl">
              Your ideas
              <br />
              deserve a
              <br />
              <span className="text-[#22C55E]">
                platform.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-gray-500">
              Create your channel, share your knowledge
              and connect with people who care about what
              you build.
            </p>

          </div>

          <p className="text-xs text-gray-600">
            Built for creators at MANIT and beyond.
          </p>

        </div>
      </div>

      {/* Register */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">

        <div className="w-full max-w-md">

          <Link
            to="/"
            className="mb-10 flex items-center justify-center gap-2 lg:hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22C55E]">
              <span className="font-black text-[#07100A]">
                M
              </span>
            </div>

            <span className="text-lg font-bold">
              MANIT<span className="text-[#22C55E]">Tube</span>
            </span>
          </Link>

          <div className="mb-8">

            <h2 className="text-3xl font-bold tracking-tight">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              It only takes a minute to get started.
            </p>

          </div>

          <form className="space-y-4">

            {/* Username */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Username
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="text"
                  placeholder="Choose a username"
                  className="h-12 w-full rounded-xl border border-[#2A3037] bg-[#111418] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#22C55E]/60 focus:ring-4 focus:ring-[#22C55E]/5"
                />

              </div>
            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-[#2A3037] bg-[#111418] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#22C55E]/60 focus:ring-4 focus:ring-[#22C55E]/5"
                />

              </div>
            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="h-12 w-full rounded-xl border border-[#2A3037] bg-[#111418] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#22C55E]/60 focus:ring-4 focus:ring-[#22C55E]/5"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-600 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Terms */}
            <p className="pt-1 text-xs leading-5 text-gray-600">
              By creating an account, you agree to our
              terms of service and privacy policy.
            </p>

            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-sm font-semibold text-[#07100A] transition hover:bg-[#2DD468] hover:shadow-lg hover:shadow-[#22C55E]/10"
            >
              Create account

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#22C55E] hover:text-[#2DD468]"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}