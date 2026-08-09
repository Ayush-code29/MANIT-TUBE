import {
  Bell,
  Bookmark,
  MoreHorizontal,
  Share2,
  ThumbsUp
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Watch() {
  return (
    <div className="mx-auto max-w-[1400px]">

      {/* Video */}
      <div className="aspect-video overflow-hidden rounded-2xl border border-[#24282E] bg-black shadow-2xl">

        <div className="flex h-full items-center justify-center bg-[#111418]">

          <div className="text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E] text-2xl text-black">
              ▶
            </div>

            <p className="text-sm text-gray-500">
              Video player
            </p>

          </div>

        </div>

      </div>

      {/* Video Info */}
      <div className="mt-6">

        <h1 className="text-xl font-bold leading-7 sm:text-2xl">
          Building My First Production-Level MERN Project
        </h1>

        <div className="mt-4 flex flex-col gap-4 border-b border-[#24282E] pb-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Creator */}
          <div className="flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/100?img=12"
              className="h-11 w-11 rounded-full"
              alt="creator"
            />

            <div>

              <Link
                to="/channel/ayushcodes"
                className="text-sm font-semibold hover:text-[#22C55E]"
              >
                Ayush Codes
              </Link>

              <p className="text-xs text-gray-600">
                12.4K subscribers
              </p>

            </div>

            <button className="ml-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200">
              Subscribe
            </button>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 overflow-x-auto">

            <button className="flex items-center gap-2 rounded-full bg-[#181C21] px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#22272E] hover:text-white">
              <ThumbsUp size={17} />
              1.2K
            </button>

            <button className="flex items-center gap-2 rounded-full bg-[#181C21] px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#22272E] hover:text-white">
              <Share2 size={17} />
              Share
            </button>

            <button className="flex items-center gap-2 rounded-full bg-[#181C21] px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#22272E] hover:text-white">
              <Bookmark size={17} />
              Save
            </button>

            <button className="rounded-full bg-[#181C21] p-2.5 text-gray-400 hover:text-white">
              <MoreHorizontal size={18} />
            </button>

          </div>

        </div>

        {/* Description */}
        <div className="mt-5 rounded-2xl bg-[#111418] p-4">

          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">

            <span>12K views</span>
            <span>•</span>
            <span>2 days ago</span>

          </div>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-gray-400">
            In this video, we build a production-level full-stack
            application and discuss the architecture, database
            design and development workflow behind it.
          </p>

        </div>

        {/* Comments */}
        <section className="mt-8">

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">
              Comments
            </h2>

            <span className="text-sm text-gray-600">
              128
            </span>
          </div>

          <div className="mt-5 flex gap-3">

            <div className="h-9 w-9 shrink-0 rounded-full bg-[#22C55E]" />

            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border-b border-[#2A3037] bg-transparent pb-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#22C55E]"
              />
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}