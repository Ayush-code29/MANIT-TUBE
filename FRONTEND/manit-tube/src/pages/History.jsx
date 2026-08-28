import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Clock3,
  Play,
  Trash2,
  History as HistoryIcon,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  clearWatchHistory,
  getWatchHistory,
  removeFromWatchHistory,
} from "../utils/history";

function formatViews(value) {
  const count = Number(value) || 0;

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(
      1
    )}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(
      1
    )}K`;
  }

  return count.toString();
}

function formatRelativeTime(date) {
  if (!date) {
    return "";
  }

  const difference =
    Date.now() -
    new Date(date).getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference /
      (1000 * 60 * 60)
  );

  const days = Math.floor(
    difference /
      (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ago`;
  }

  if (hours < 24) {
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;
  }

  if (days < 7) {
    return `${days} day${
      days !== 1 ? "s" : ""
    } ago`;
  }

  const weeks = Math.floor(
    days / 7
  );

  if (weeks < 5) {
    return `${weeks} week${
      weeks !== 1 ? "s" : ""
    } ago`;
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function HistoryCard({
  item,
  onRemove,
}) {
  const creator =
    item.owner?.fullName ||
    item.owner?.username ||
    "MANIT Student";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#deded9] bg-white transition hover:border-[#c8c8c2] hover:shadow-lg dark:border-[#292a2b] dark:bg-[#181a1b] dark:hover:border-[#3a3c3d]">
      <Link
        to={`/watch/${item.videoId}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden bg-[#111418]">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Play
                size={32}
                className="text-gray-600"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1.5 text-[11px] font-semibold text-white">
            <Clock3 size={12} />

            Watched
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex gap-3">
          <Link
            to={`/watch/${item.videoId}`}
            className="min-w-0 flex-1"
          >
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 transition group-hover:text-[#075b8d] dark:group-hover:text-[#58a9d2]">
              {item.title}
            </h3>

            <p className="mt-1.5 text-xs text-[#85867f]">
              {creator}
            </p>

            <p className="mt-1 text-xs text-[#999a94]">
              {formatViews(item.views)} views
              {" · "}
              {formatRelativeTime(
                item.watchedAt
              )}
            </p>
          </Link>

          <button
            type="button"
            onClick={() =>
              onRemove(item.videoId)
            }
            title="Remove from history"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadHistory = useCallback(() => {
    setHistory(
      getWatchHistory()
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    loadHistory();

    const handleHistoryUpdate =
      () => {
        loadHistory();
      };

    window.addEventListener(
      "watch-history-updated",
      handleHistoryUpdate
    );

    return () => {
      window.removeEventListener(
        "watch-history-updated",
        handleHistoryUpdate
      );
    };
  }, [loadHistory]);

  const handleRemove = (
    videoId
  ) => {
    removeFromWatchHistory(
      videoId
    );
  };

  const handleClearAll = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to clear your entire watch history?"
      );

    if (!confirmed) {
      return;
    }

    clearWatchHistory();
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] pb-16">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-[#181C21]" />

          <div className="mt-3 h-4 w-72 rounded bg-[#181C21]" />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-[#111418]"
                >
                  <div className="aspect-video bg-[#181C21]" />

                  <div className="p-4">
                    <div className="h-4 rounded bg-[#181C21]" />

                    <div className="mt-3 h-3 w-2/3 rounded bg-[#181C21]" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] pb-16">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-[#deded9] pb-6 dark:border-[#292a2b] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock3
              size={20}
              className="text-[#075b8d] dark:text-[#58a9d2]"
            />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#075b8d] dark:text-[#58a9d2]">
              Your library
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Watch history
          </h1>

          <p className="mt-2 text-sm text-[#777871] dark:text-[#969791]">
            Videos you've recently
            watched.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#deded9] px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 dark:border-[#292a2b] dark:text-gray-400"
          >
            <Trash2 size={15} />

            Clear history
          </button>
        )}
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="flex min-h-[55vh] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#075b8d]/10 text-[#075b8d] dark:bg-[#58a9d2]/10 dark:text-[#58a9d2]">
              <HistoryIcon
                size={28}
              />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Your history is empty
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Videos you watch will
              appear here so you can
              easily find them again.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#075b8d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#064d77]"
            >
              <Play
                size={15}
                fill="currentColor"
              />

              Start watching
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Count */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              {history.length}{" "}
              {history.length === 1
                ? "video"
                : "videos"}
            </p>
          </div>

          {/* History Grid */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {history.map((item) => (
              <HistoryCard
                key={`${item.videoId}-${item.watchedAt}`}
                item={item}
                onRemove={
                  handleRemove
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}