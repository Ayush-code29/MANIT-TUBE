import { useCallback, useEffect, useState } from "react";
import {
  RefreshCw,
  Upload,
} from "lucide-react";

import { Link } from "react-router-dom";

import VideoCard from "../components/home/VideoCard";
import { getVideos } from "../api/videoApi";

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video rounded-xl bg-[#181C21]" />

      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-[#181C21]" />

        <div className="flex-1">
          <div className="h-4 w-11/12 rounded bg-[#181C21]" />
          <div className="mt-2 h-3 w-2/3 rounded bg-[#181C21]" />
          <div className="mt-2 h-3 w-1/2 rounded bg-[#181C21]" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getVideos(1, 12);

      setVideos(data.videos || []);
    } catch (error) {
      console.error("Home videos error:", error);

      setError(
        error.message ||
          "Unable to load videos."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  return (
    <div className="mx-auto max-w-[1400px] pb-16">
      <section className="mb-8 flex items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C55E]">
            MANIT Tube
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Latest from the community
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Discover tutorials, projects, campus content
            and useful videos from MANIT creators.
          </p>
        </div>

        <Link
          to="/upload"
          className="hidden shrink-0 items-center gap-2 rounded-lg bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#16A34A] sm:flex"
        >
          <Upload size={16} />
          Upload
        </Link>
      </section>

      {loading && (
        <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-[#24282E] bg-[#111418] p-10 text-center">
          <h2 className="text-lg font-bold">
            Couldn't load videos
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={loadVideos}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-black"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        videos.length === 0 && (
          <div className="rounded-2xl border border-[#24282E] bg-[#111418] p-12 text-center">
            <h2 className="text-lg font-bold">
              No videos yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Be one of the first creators to share
              something with the MANIT community.
            </p>

            <Link
              to="/upload"
              className="mt-6 inline-flex rounded-lg bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-black"
            >
              Upload a video
            </Link>
          </div>
        )}

      {!loading &&
        !error &&
        videos.length > 0 && (
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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