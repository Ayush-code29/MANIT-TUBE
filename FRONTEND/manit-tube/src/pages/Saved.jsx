import { useEffect, useState } from "react";
import { Bookmark, Play, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  getSavedVideos,
  unsaveVideo,
} from "../api/videoApi";

function formatViews(views) {
  const count = Number(views) || 0;

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }

  return count.toString();
}

function formatTime(date) {
  if (!date) return "";

  const created = new Date(date);
  const now = new Date();

  const days = Math.floor(
    (now - created) / (1000 * 60 * 60 * 24)
  );

  if (days <= 0) return "today";

  if (days === 1) return "1 day ago";

  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  return `${Math.floor(days / 30)} months ago`;
}

function VideoCard({ video, onRemove }) {
  const owner = video.owner;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="group"
    >
      <Link
        to={`/watch/${video._id}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#161819]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-1 text-[10px] font-semibold text-white">
            {Math.floor((video.duration || 0) / 60)}:
            {String(
              Math.floor(video.duration || 0) % 60
            ).padStart(2, "0")}
          </span>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-xl">
              <Play
                size={17}
                fill="currentColor"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex gap-3">
        <img
          src={
            owner?.avatar ||
            "https://i.pravatar.cc/100?img=12"
          }
          alt=""
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <Link
            to={`/watch/${video._id}`}
            className="line-clamp-2 text-sm font-semibold leading-5 transition hover:text-[#075b8d] dark:hover:text-[#58a9d2]"
          >
            {video.title}
          </Link>

          <p className="mt-1 text-xs text-[#85867f]">
            {owner?.fullName ||
              owner?.username ||
              "MANIT Creator"}
          </p>

          <p className="text-xs text-[#999a94]">
            {formatViews(video.views)} views
            {video.createdAt
              ? ` · ${formatTime(video.createdAt)}`
              : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(video._id)}
          className="self-start rounded-lg p-2 text-[#85867f] opacity-0 transition hover:bg-black/5 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-white/5"
          title="Remove from saved"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.article>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video rounded-xl bg-[#181C21]" />

      <div className="mt-4 flex gap-3">
        <div className="h-9 w-9 rounded-full bg-[#181C21]" />

        <div className="flex-1">
          <div className="h-4 w-4/5 rounded bg-[#181C21]" />
          <div className="mt-2 h-3 w-2/5 rounded bg-[#181C21]" />
          <div className="mt-2 h-3 w-3/5 rounded bg-[#181C21]" />
        </div>
      </div>
    </div>
  );
}

export default function Saved() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSavedVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSavedVideos();

        setVideos(
          data.videos ||
          data.savedVideos ||
          data.data ||
          []
        );
      } catch (error) {
        console.error(
          "Saved videos error:",
          error
        );

        setError(
          error.message ||
          "Unable to load saved videos."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSavedVideos();
  }, []);

  const handleRemove = async (videoId) => {
    const previous = videos;

    setVideos((current) =>
      current.filter(
        (video) => video._id !== videoId
      )
    );

    try {
      await unsaveVideo(videoId);
    } catch (error) {
      console.error(error);

      setVideos(previous);
    }
  };

  return (
    <main className="mx-auto max-w-[1600px] pb-20">
      <section className="mb-9">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f1f6] text-[#075b8d] dark:bg-[#173442] dark:text-[#62afd6]">
            <Bookmark size={19} />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#075b8d]">
              Library
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Saved videos
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777871] dark:text-[#969791]">
          Videos you saved for later. Pick up where
          you left off whenever you’re ready.
        </p>
      </section>

      {loading && (
        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-[#deded9] bg-white p-10 text-center dark:border-[#292a2b] dark:bg-[#181a1b]">
          <p className="text-sm text-red-500">
            {error}
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        videos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d5d5d0] bg-white px-6 py-20 text-center dark:border-[#303233] dark:bg-[#181a1b]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f1f6] text-[#075b8d] dark:bg-[#173442] dark:text-[#62afd6]">
              <Bookmark size={20} />
            </div>

            <h2 className="mt-5 text-lg font-bold">
              Nothing saved yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#85867f]">
              When you find something worth watching
              later, hit Save and it’ll appear here.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-lg bg-[#075b8d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#064d77]"
            >
              Explore videos
            </Link>
          </div>
        )}

      {!loading &&
        !error &&
        videos.length > 0 && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
    </main>
  );
}