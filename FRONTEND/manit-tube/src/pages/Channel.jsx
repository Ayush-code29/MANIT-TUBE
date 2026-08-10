import {
  CalendarDays,
  Link as LinkIcon,
  MapPin
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import VideoGrid from "../components/home/VideoGrid";

const videos = [
  {
    id: 1,
    title: "Building My First Production-Level MERN Project",
    channel: "Ayush Codes",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    avatar: "https://i.pravatar.cc/100?img=12",
    views: "12K",
    uploadedAt: "2 days ago",
    duration: "12:42",
  },
  {
    id: 2,
    title: "React Architecture That Scales",
    channel: "Ayush Codes",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900",
    avatar: "https://i.pravatar.cc/100?img=12",
    views: "8.4K",
    uploadedAt: "1 week ago",
    duration: "18:20",
  },
  {
    id: 3,
    title: "How I Built a Node.js Backend",
    channel: "Ayush Codes",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
    avatar: "https://i.pravatar.cc/100?img=12",
    views: "6.1K",
    uploadedAt: "2 weeks ago",
    duration: "22:12",
  },
];

export default function Channel() {
  const { username } = useParams();

  return (
    <div className="mx-auto max-w-[1600px]">

      {/* Cover */}
      <div className="relative h-40 overflow-hidden rounded-3xl border border-[#24282E] bg-[#111418] sm:h-56 lg:h-64">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.18),transparent_35%)]" />

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#090B0D] to-transparent" />

      </div>

      {/* Profile */}
      <div className="relative px-2 sm:px-5">

        <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">

          <img
            src="https://i.pravatar.cc/200?img=12"
            alt="Ayush Codes"
            className="h-28 w-28 rounded-full border-4 border-[#090B0D] object-cover sm:h-32 sm:w-32"
          />

          <div className="flex-1 pb-1">

            <h1 className="text-2xl font-bold">
              Ayush Codes
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              @{username || "ayushcodes"}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              12.4K subscribers • 48 videos
            </p>

          </div>

          <button className="rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-semibold text-[#07100A] hover:bg-[#2DD468]">
            Subscribe
          </button>

        </div>

        {/* Bio */}
        <div className="mt-6 max-w-2xl">

          <p className="text-sm leading-6 text-gray-400">
            CSE student building projects, learning software
            engineering and sharing everything along the way.
          </p>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-600">

            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              Bhopal
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              Joined 2026
            </span>

            <span className="flex items-center gap-1.5">
              <LinkIcon size={14} />
              manittube
            </span>

          </div>

        </div>

      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-7 overflow-x-auto border-b border-[#24282E]">

        {["Videos", "Playlists", "About"].map(
          (tab, index) => (
            <button
              key={tab}
              className={`relative pb-4 text-sm font-semibold ${
                index === 0
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-300"
              }`}
            >
              {tab}

              {index === 0 && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22C55E]" />
              )}
            </button>
          )
        )}

      </div>

      {/* Videos */}
      <div className="mt-7">

        <h2 className="mb-5 text-xl font-bold">
          Latest videos
        </h2>

        <VideoGrid videos={videos} />

      </div>

    </div>
  );
}