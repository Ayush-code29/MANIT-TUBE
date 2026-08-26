import { useState } from "react";
import {
  Bookmark,
  Trash2,
} from "lucide-react";

import VideoCard from "../components/video/VideoCard";

import {
  clearSavedVideos,
  getSavedVideos,
} from "../utils/playlists";

export default function Playlists() {
  const [videos, setVideos] =
    useState(() => getSavedVideos());

  const handleClear = () => {
    clearSavedVideos();
    setVideos([]);
  };

  return (
    <div className="mx-auto max-w-[1400px] pb-20">
      <div className="flex flex-col justify-between gap-5 border-b border-[#24282E] pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-[#22C55E]">
            <Bookmark size={17} />

            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Your library
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold">
            Saved videos
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Videos you've saved for later.
          </p>
        </div>

        {videos.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#181C21] px-4 py-2.5 text-xs font-semibold text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 sm:self-auto"
          >
            <Trash2 size={15} />
            Clear saved
          </button>
        )}
      </div>

      {videos.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#24282E] bg-[#111418] p-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#181C21]">
            <Bookmark
              size={20}
              className="text-gray-500"
            />
          </div>

          <h2 className="mt-4 text-lg font-bold">
            Nothing saved yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-600">
            Save useful videos and they'll stay
            here until you're ready to watch them.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      )}
    </div>
  );
}