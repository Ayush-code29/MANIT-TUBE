import {
  ArrowLeft,
  Compass,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="px-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#181C21]">
          <Compass
            size={24}
            className="text-[#22C55E]"
          />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
          404
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
          The page you're looking for doesn't
          exist or may have moved.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#16A34A]"
        >
          <ArrowLeft size={15} />
          Back home
        </Link>
      </div>
    </div>
  );
}