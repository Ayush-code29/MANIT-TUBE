import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090B0D] px-6">

      <div className="text-center">

        <p className="text-8xl font-black tracking-tighter text-[#22C55E]/20 sm:text-9xl">
          404
        </p>

        <h1 className="-mt-6 text-2xl font-bold sm:text-3xl">
          This page doesn't exist.
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
          Looks like this video or page went off the air.
          Let's get you back to something worth watching.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-semibold text-[#07100A] hover:bg-[#2DD468]"
        >
          <Home size={17} />
          Back to MANIT Tube
          <ArrowLeft size={16} className="rotate-180" />
        </Link>

      </div>

    </div>
  );
}