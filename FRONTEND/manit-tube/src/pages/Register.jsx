import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Camera,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";
import AuthBackground from "../components/auth/AuthBackground";

export default function Register() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!avatar) {
      setAvatarPreview("");
      return;
    }

    const url = URL.createObjectURL(avatar);
    setAvatarPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [avatar]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Avatar must be smaller than 5MB.");
      return;
    }

    setError("");
    setAvatar(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !username.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !password
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (!avatar) {
      setError("Please upload a profile picture.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password should be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: username.trim(),
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        avatar,
      });

      setSuccess(
        "Account created successfully. Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      setError(
        error.message || "Unable to create account."
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
        className="w-full max-w-[470px]"
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
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22c55e]">
              Join the community
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Create account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Set up your profile and start sharing.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Avatar */}

            <div className="mb-6 flex flex-col items-center">
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="group relative"
              >
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/20">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={30}
                      className="text-gray-600"
                    />
                  )}
                </div>

                <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#17191b] bg-[#22c55e] text-black transition group-hover:scale-105">
                  <Camera size={14} />
                </span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <p className="mt-3 text-xs text-gray-600">
                Profile picture · JPG, PNG or WebP
              </p>
            </div>

            {/* Full name */}

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-300">
                Full name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  value={fullName}
                  disabled={loading}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  placeholder="Your full name"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-700 focus:border-[#22c55e]/60"
                />
              </div>
            </div>

            {/* Username */}

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-300">
                Username
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                  @
                </span>

                <input
                  value={username}
                  disabled={loading}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                        .toLowerCase()
                        .replace(/\s/g, "")
                    )
                  }
                  placeholder="yourusername"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-700 focus:border-[#22c55e]/60"
                />
              </div>
            </div>

            {/* Email */}

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
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-700 focus:border-[#22c55e]/60"
                />
              </div>
            </div>

            {/* Password */}

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
                  placeholder="At least 6 characters"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-700 focus:border-[#22c55e]/60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-white"
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
              className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] text-sm font-bold text-black transition hover:bg-[#2bd66b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="my-6 h-px bg-white/[0.07]" />

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-white transition hover:text-[#22c55e]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}