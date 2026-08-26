import {
  MoreHorizontal,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";

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

  const difference =
    Date.now() - new Date(date).getTime();

  const minutes = Math.floor(
    difference / 60000
  );

  if (minutes < 1) return "just now";

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return `${weeks}w ago`;
  }

  return `${Math.floor(days / 30)}mo ago`;
}

function formatDuration(duration) {
  const seconds = Number(duration) || 0;

  const minutes = Math.floor(
    seconds / 60
  );

  const remaining = Math.floor(
    seconds % 60
  );

  return `${minutes}:${String(
    remaining
  ).padStart(2, "0")}`;
}

export default function VideoCard({
  video,
}) {
  if (!video) return null;

  const owner = video.owner || {};

  const creator =
    owner.fullName ||
    owner.username ||
    "MANIT Creator";

  const avatar =
    owner.avatar ||
    "https://i.pravatar.cc/100?img=12";

  return (
    <article className="group min-w-0">
      <Link
        to={`/watch/${video._id}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#111418]">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#181C21]">
              <Play
                size={25}
                className="text-gray-600"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

          {video.duration && (
            <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-1 text-[10px] font-semibold text-white">
              {formatDuration(
                video.duration
              )}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex gap-3">
        <Link
          to={`/channel/${owner.username || ""}`}
          className="shrink-0"
        >
          <img
            src={avatar}
            alt={creator}
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <Link
              to={`/watch/${video._id}`}
              className="line-clamp-2 text-sm font-semibold leading-5 text-white transition hover:text-[#22C55E]"
            >
              {video.title}
            </Link>

            <button
              type="button"
              className="shrink-0 rounded-full p-1 text-gray-600 transition hover:bg-[#181C21] hover:text-white"
            >
              <MoreHorizontal
                size={17}
              />
            </button>
          </div>

          <Link
            to={`/channel/${owner.username || ""}`}
            className="mt-1 block truncate text-xs text-gray-500 hover:text-gray-300"
          >
            {creator}
          </Link>

          <p className="mt-0.5 text-xs text-gray-600">
            {formatViews(video.views)} views
            {" • "}
            {formatTime(video.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}