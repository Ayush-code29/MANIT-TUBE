import {
  MoreVertical,
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

  return String(count);
}

function formatDuration(seconds) {
  const value = Math.max(
    0,
    Math.floor(Number(seconds) || 0)
  );

  const minutes = Math.floor(value / 60);
  const remainingSeconds = value % 60;

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function formatTime(date) {
  if (!date) return "";

  const now = Date.now();
  const created = new Date(date).getTime();

  const seconds = Math.floor(
    (now - created) / 1000
  );

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);

  return `${months}mo ago`;
}

export default function VideoCard({
  video,
}) {
  const owner = video?.owner;

  const creatorName =
    owner?.fullName ||
    owner?.username ||
    "MANIT Creator";

  const avatar =
    owner?.avatar ||
    "https://i.pravatar.cc/100?img=12";

  return (
    <article className="group min-w-0">
      <Link
        to={`/watch/${video._id}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#15181C]">
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />

          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

          <div className="absolute bottom-2 right-2 rounded-md bg-black/85 px-1.5 py-1 text-[11px] font-semibold text-white">
            {formatDuration(video.duration)}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-xl">
              <Play
                size={17}
                fill="currentColor"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex gap-3">
        <Link
          to={`/channel/${owner?.username || ""}`}
          className="shrink-0"
        >
          <img
            src={avatar}
            alt={creatorName}
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            to={`/watch/${video._id}`}
            className="line-clamp-2 text-sm font-semibold leading-5 text-white transition hover:text-[#22C55E]"
          >
            {video.title}
          </Link>

          <Link
            to={`/channel/${owner?.username || ""}`}
            className="mt-1 block truncate text-xs text-gray-500 hover:text-gray-300"
          >
            {creatorName}
          </Link>

          <p className="mt-0.5 text-xs text-gray-600">
            {formatViews(video.views)} views
            <span className="mx-1.5">•</span>
            {formatTime(video.createdAt)}
          </p>
        </div>

        <button
          type="button"
          className="h-8 w-8 shrink-0 rounded-full text-gray-500 opacity-0 transition hover:bg-[#181C21] hover:text-white group-hover:opacity-100"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <MoreVertical
            size={17}
            className="mx-auto"
          />
        </button>
      </div>
    </article>
  );
}