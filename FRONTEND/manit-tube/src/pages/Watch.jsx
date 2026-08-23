import { useEffect, useState } from "react";
import {
  Bookmark,
  MoreHorizontal,
  Share2,
  ThumbsUp,
} from "lucide-react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { getVideoById } from "../api/videoApi";

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

function formatRelativeTime(date) {
  if (!date) return "";

  const now = new Date();
  const createdAt = new Date(date);

  const difference = now - createdAt;

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const weeks = Math.floor(days / 7);

  const months = Math.floor(days / 30);

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  if (weeks < 5) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }

  return `${months} month${months !== 1 ? "s" : ""} ago`;
}

function LoadingWatch() {
  return (
    <div className="mx-auto max-w-[1400px] animate-pulse">
      <div className="aspect-video rounded-2xl bg-[#181C21]" />

      <div className="mt-6 h-7 w-3/4 rounded bg-[#181C21]" />

      <div className="mt-5 h-12 rounded bg-[#181C21]" />

      <div className="mt-5 h-32 rounded-2xl bg-[#111418]" />
    </div>
  );
}

export default function Watch() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getVideoById(videoId);

        setVideo(data.video);
      } catch (error) {
        console.error("Watch page error:", error);

        setError(
          "Unable to load this video."
        );
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  if (loading) {
    return <LoadingWatch />;
  }

  if (error || !video) {
    return (
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-2xl border border-[#24282E] bg-[#111418] p-10 text-center">
          <h1 className="text-xl font-bold">
            Video not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error ||
              "This video may have been removed or does not exist."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#16A34A]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const creatorName =
    video.owner?.fullName ||
    video.owner?.username ||
    "MANIT Student";

  const creatorUsername =
    video.owner?.username || "";

  const creatorAvatar =
    video.owner?.avatar ||
    "https://i.pravatar.cc/100?img=12";

  return (
    <div className="mx-auto max-w-[1400px]">

      {/* Video */}

      <div className="aspect-video overflow-hidden rounded-2xl border border-[#24282E] bg-black shadow-2xl">
        <video
          src={video.videoFile}
          poster={video.thumbnail}
          controls
          playsInline
          className="h-full w-full object-contain"
        />
      </div>

      {/* Video Info */}

      <div className="mt-6">

        <h1 className="text-xl font-bold leading-7 sm:text-2xl">
          {video.title}
        </h1>

        <div className="mt-4 flex flex-col gap-4 border-b border-[#24282E] pb-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Creator */}

          <div className="flex items-center gap-3">

            <img
              src={creatorAvatar}
              className="h-11 w-11 rounded-full object-cover"
              alt={creatorName}
            />

            <div>

              <Link
                to={`/channel/${creatorUsername}`}
                className="text-sm font-semibold hover:text-[#22C55E]"
              >
                {creatorName}
              </Link>

              <p className="text-xs text-gray-600">
                MANIT Tube Creator
              </p>

            </div>

            <button className="ml-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200">
              Subscribe
            </button>

          </div>

          {/* Actions */}

          <div className="flex items-center gap-2 overflow-x-auto">

            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                liked
                  ? "bg-[#22C55E] text-black"
                  : "bg-[#181C21] text-gray-300 hover:bg-[#22272E] hover:text-white"
              }`}
            >
              <ThumbsUp
                size={17}
                fill={liked ? "currentColor" : "none"}
              />

              {liked ? "Liked" : "Like"}
            </button>

            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    window.location.href
                  );

                  alert("Video link copied!");
                } catch (error) {
                  console.log(error);
                }
              }}
              className="flex items-center gap-2 rounded-full bg-[#181C21] px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#22272E] hover:text-white"
            >
              <Share2 size={17} />
              Share
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                saved
                  ? "bg-[#22C55E] text-black"
                  : "bg-[#181C21] text-gray-300 hover:bg-[#22272E] hover:text-white"
              }`}
            >
              <Bookmark
                size={17}
                fill={saved ? "currentColor" : "none"}
              />

              {saved ? "Saved" : "Save"}
            </button>

            <button className="rounded-full bg-[#181C21] p-2.5 text-gray-400 hover:text-white">
              <MoreHorizontal size={18} />
            </button>

          </div>

        </div>

        {/* Description */}

        <div className="mt-5 rounded-2xl bg-[#111418] p-4">

          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">

            <span>
              {formatViews(video.views)} views
            </span>

            <span>•</span>

            <span>
              {formatRelativeTime(video.createdAt)}
            </span>

          </div>

          <p className="mt-3 max-w-4xl whitespace-pre-line text-sm leading-6 text-gray-400">
            {video.description}
          </p>

        </div>

        {/* Comments */}

        <section className="mt-8">

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">
              Comments
            </h2>

            <span className="text-sm text-gray-600">
              0
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