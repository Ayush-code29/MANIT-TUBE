import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from =
    location.state?.from || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await login(
        email.trim(),
        password
      );

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-[1100px] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-[920px] overflow-hidden rounded-2xl border border-[#deded9] bg-white shadow-sm dark:border-[#292a2b] dark:bg-[#181a1b] md:grid-cols-[0.9fr_1.1fr]">

        {/* Left */}

        <div className="hidden flex-col justify-between bg-[#075b8d] p-9 text-white md:flex">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              MANIT Tube
            </p>

            <h1 className="mt-8 text-3xl font-bold leading-tight">
              Learn.
              <br />
              Build.
              <br />
              Share.
            </h1>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
              Your campus video platform for lectures,
              projects, coding and everything worth
              sharing with the MANIT community.
            </p>
          </div>

          <p className="text-xs text-white/50">
            Built for the MANIT community.
          </p>
        </div>

        {/* Form */}

        <div className="p-7 sm:p-10">
          <div className="max-w-md">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#075b8d]">
              Welcome back
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Sign in to MANIT Tube
            </h2>

            <p className="mt-2 text-sm text-[#777871] dark:text-[#969791]">
              Continue watching, creating and sharing.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Email */}

              <div>
                <label className="text-sm font-semibold">
                  Email
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999a94]"
                  />

                  <input
                    type="email"
                    value={email}
                    disabled={loading}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-lg border border-[#deded9] bg-[#fafaf8] pl-10 pr-4 text-sm outline-none transition focus:border-[#075b8d] focus:bg-white dark:border-[#292a2b] dark:bg-[#151718] dark:focus:bg-[#181a1b]"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    Password
                  </label>
                </div>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999a94]"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    disabled={loading}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-lg border border-[#deded9] bg-[#fafaf8] pl-10 pr-11 text-sm outline-none transition focus:border-[#075b8d] focus:bg-white dark:border-[#292a2b] dark:bg-[#151718] dark:focus:bg-[#181a1b]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999a94] hover:text-[#075b8d]"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#075b8d] text-sm font-semibold text-white transition hover:bg-[#064d77] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-[#deded9] pt-6 text-center dark:border-[#292a2b]">
              <p className="text-sm text-[#777871] dark:text-[#969791]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#075b8d] hover:underline dark:text-[#58a9d2]"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}