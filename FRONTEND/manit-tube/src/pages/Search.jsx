import { useEffect, useMemo, useState } from "react";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useSearchParams } from "react-router-dom";

import { getVideos } from "../api/videoApi";
import VideoCard from "../components/video/VideoCard";

export default function Search() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialQuery =
    searchParams.get("q") || "";

  const [query, setQuery] =
    useState(initialQuery);

  const [videos, setVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getVideos(
          1,
          50
        );

        setVideos(data.videos || []);
      } catch (error) {
        console.error(
          "Search error:",
          error
        );

        setError(
          "Unable to load videos."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    const search =
      query.trim().toLowerCase();

    if (!search) {
      return videos;
    }

    return videos.filter((video) => {
      const title =
        video.title?.toLowerCase() || "";

      const description =
        video.description?.toLowerCase() ||
        "";

      const username =
        video.owner?.username?.toLowerCase() ||
        "";

      const fullName =
        video.owner?.fullName?.toLowerCase() ||
        "";

      return (
        title.includes(search) ||
        description.includes(search) ||
        username.includes(search) ||
        fullName.includes(search)
      );
    });
  }, [query, videos]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmed = query.trim();

    if (trimmed) {
      setSearchParams({
        q: trimmed,
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] pb-20">
      <div className="border-b border-[#24282E] pb-6">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-2xl items-center rounded-full border border-[#2A3037] bg-[#111418] px-4 transition focus-within:border-[#22C55E]"
        >
          <SearchIcon
            size={19}
            className="shrink-0 text-gray-500"
          />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search videos, creators..."
            className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-600"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSearchParams({});
              }}
              className="rounded-full p-1.5 text-gray-500 hover:bg-[#22272E] hover:text-white"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            className="ml-2 rounded-full bg-[#22C55E] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#16A34A]"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-600">
            Explore
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {query
              ? `Results for "${query}"`
              : "All videos"}
          </h1>
        </div>

        <button className="hidden items-center gap-2 rounded-full bg-[#181C21] px-4 py-2 text-xs font-medium text-gray-400 hover:text-white sm:flex">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {loading && (
        <div className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse"
            >
              <div className="aspect-video rounded-xl bg-[#181C21]" />

              <div className="mt-3 flex gap-3">
                <div className="h-9 w-9 rounded-full bg-[#181C21]" />

                <div className="flex-1">
                  <div className="h-4 rounded bg-[#181C21]" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-[#181C21]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-10 rounded-2xl border border-[#24282E] bg-[#111418] p-10 text-center">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        filteredVideos.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#24282E] bg-[#111418] p-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#181C21]">
              <SearchIcon
                size={20}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-4 text-lg font-bold">
              No videos found
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Try a different keyword or search
              for another creator.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredVideos.length > 0 && (
          <div className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video) => (
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