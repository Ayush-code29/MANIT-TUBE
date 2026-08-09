import {
  Filter,
  Search as SearchIcon
} from "lucide-react";

import VideoGrid from "../components/common/VideoGrid";

const results = [
  {
    id: 1,
    title: "Complete React Architecture for Large Projects",
    channel: "CodeWithDev",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900",
    avatar: "https://i.pravatar.cc/100?img=11",
    views: "28K",
    uploadedAt: "5 days ago",
    duration: "18:21",
  },
  {
    id: 2,
    title: "React Hooks Explained Properly",
    channel: "Frontend Labs",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    avatar: "https://i.pravatar.cc/100?img=19",
    views: "16K",
    uploadedAt: "1 week ago",
    duration: "14:42",
  },
  {
    id: 3,
    title: "Build Production React Apps",
    channel: "Dev Journey",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    avatar: "https://i.pravatar.cc/100?img=20",
    views: "21K",
    uploadedAt: "2 weeks ago",
    duration: "25:10",
  },
];

export default function Search() {
  return (
    <div className="mx-auto max-w-[1500px]">

      {/* Header */}
      <div className="mb-7">

        <p className="text-sm text-gray-600">
          Search results
        </p>

        <h1 className="mt-1 text-2xl font-bold">
          Results for{" "}
          <span className="text-[#22C55E]">
            "React"
          </span>
        </h1>

      </div>

      {/* Search controls */}
      <div className="mb-7 flex flex-col gap-3 sm:flex-row">

        <div className="flex h-11 flex-1 items-center rounded-xl border border-[#2A3037] bg-[#111418]">

          <SearchIcon
            size={18}
            className="ml-4 text-gray-600"
          />

          <input
            defaultValue="React"
            className="h-full flex-1 bg-transparent px-3 text-sm text-white outline-none"
          />

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-[#2A3037] bg-[#111418] px-5 text-sm font-medium text-gray-400 hover:bg-[#181C21] hover:text-white">
          <Filter size={17} />
          Filters
        </button>

      </div>

      {/* Type */}
      <div className="mb-7 flex gap-2 overflow-x-auto">

        {["All", "Videos", "Creators", "Playlists"].map(
          (item, index) => (
            <button
              key={item}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                index === 0
                  ? "bg-white text-black"
                  : "bg-[#111418] text-gray-500 hover:text-white"
              }`}
            >
              {item}
            </button>
          )
        )}

      </div>

      <VideoGrid videos={results} />

    </div>
  );
}