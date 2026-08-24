import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import AuthBackground from "../components/auth/AuthBackground";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(
        email.trim().toLowerCase(),
        password
      );

      setSuccess("Welcome back. Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 600);
    } catch (error) {
      setError(
        error.message || "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-white">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-[430px]"
      >
        <div className="mb-7 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22c55e] text-sm font-black text-black">
              M
            </span>

            <span className="text-lg font-bold tracking-tight">
              MANIT<span className="text-[#22c55e]">Tube</span>
            </span>
          </Link>
        </div>

        <div className="rounded-[28px] border border-white/[0.09] bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22c55e]">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Sign in
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Continue watching and sharing with the
              MANIT community.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-300">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-700 focus:border-[#22c55e]/60 focus:bg-black/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-300">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  disabled={loading}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-700 focus:border-[#22c55e]/60 focus:bg-black/30"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-600 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="flex gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400"
                >
                  <AlertCircle
                    size={16}
                    className="shrink-0"
                  />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="flex gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-xs text-green-400"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0"
                  />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] text-sm font-bold text-black transition hover:bg-[#2bd66b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="my-7 h-px bg-white/[0.07]" />

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-white transition hover:text-[#22c55e]"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-700">
          MANIT Tube · Built for the community
        </p>
      </motion.div>
    </div>
  );
}