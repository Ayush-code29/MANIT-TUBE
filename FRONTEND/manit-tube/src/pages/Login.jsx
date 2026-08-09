import { Eye, EyeOff, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#090B0D]">

      {/* Left Branding */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.14),transparent_35%)]" />

        <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

          <Link
            to="/"
            className="flex w-fit items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]">
              <span className="text-lg font-black text-[#07100A]">
                M
              </span>
            </div>

            <span className="text-xl font-bold">
              MANIT<span className="text-[#22C55E]">Tube</span>
            </span>
          </Link>

          <div className="max-w-lg">

            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#22C55E]">
              Your space to create
            </p>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight xl:text-6xl">
              Watch.
              <br />
              Learn.
              <br />
              <span className="text-[#22C55E]">
                Create.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-gray-500">
              Discover creators, share your ideas and
              build your community on MANIT Tube.
            </p>

          </div>

          <p className="text-xs text-gray-600">
            © 2026 MANIT Tube
          </p>

        </div>
      </div>

      {/* Login */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
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
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your account.
            </p>

          </div>

          <form className="space-y-5">

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

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-[#22C55E] hover:text-[#2DD468]"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] text-sm font-semibold text-[#07100A] transition hover:bg-[#2DD468] hover:shadow-lg hover:shadow-[#22C55E]/10"
            >
              Sign in

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#24282E]" />
            <span className="text-xs text-gray-600">
              OR
            </span>
            <div className="h-px flex-1 bg-[#24282E]" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#22C55E] hover:text-[#2DD468]"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}